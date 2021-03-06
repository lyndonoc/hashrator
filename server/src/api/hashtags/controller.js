const rp = require('request-promise');

const cacheClient = require('../../lib/cache');
const config = require('../../config');
const { checkObjProps, mapObjToProps } = require('../../lib/check-obj-prop');
const { getHashTagPage } = require('../../lib/url');
const { parseHashTags } = require('../../lib/hashtags');
const { success } = require('../../lib/responses');

const getHashTags = async (req, res) => {
  const {
    params: { hashtag },
    query: { size, start, type = 'top' },
  } = req;

  if (!hashtag || !config.TAG_TYPES.hasOwnProperty(type.toUpperCase())) {
    return success(res, {
      data: [],
    });
  }

  try {
    const tagType = config.TAG_TYPES[type.toUpperCase()];
    const cachedTags = await cacheClient.getData(hashtag);

    if (cachedTags) {
      const cachedResults = JSON.parse(cachedTags);

      return success(res, {
        data: cachedResults[tagType],
        isConsecutive: tagType === config.TAG_TYPES.MORE,
        totalSize: cachedResults[config.TAG_TYPES.SIZE],
      });
    }

    const hashtagUrl = getHashTagPage(hashtag);
    const instaPage = await rp.get(hashtagUrl);
    const tagsMap = mapObjToProps(
      JSON.parse(instaPage),
      {
        [config.TAG_TYPES.TOP]: config.TAG_SEARCH_API.topPayloadShape,
        [config.TAG_TYPES.MORE]: config.TAG_SEARCH_API.morePayloadShape,
      },
      checkObjProps,
    );
    const dataMap = Object.keys(tagsMap).reduce((acc, key) => {
      const rawText = tagsMap[key]
        .map((edge) => {
          const edgeText = checkObjProps(edge, config.TAG_SEARCH_API.nodeShape);
          return edgeText
            ? edgeText[0] && edgeText[0].node && edgeText[0].node.text
            : '';
        })
        .join(' ');
      const parsedTags = Array.from(new Set(parseHashTags(rawText))).filter(
        (tag) => tag !== `#${hashtag}`,
      );

      return {
        ...acc,
        [key]: parsedTags,
      };
    }, {});
    const totalSize = Object.keys(dataMap).reduce(
      (a, b) => a + dataMap[b].length,
      0,
    );

    success(res, {
      data:
        size && start
          ? dataMap[tagType].slice(start, start + size)
          : dataMap[tagType],
      isConsecutive: tagType === config.TAG_TYPES.MORE,
      totalSize,
    });

    cacheClient.setData(
      hashtag,
      JSON.stringify({
        ...dataMap,
        [config.TAG_TYPES.SIZE]: Object.keys(dataMap).reduce(
          (a, b) => a + dataMap[b].length,
          0,
        ),
      }),
    );
  } catch (err) {
    console.error(err);
    return success(res, {
      data: [],
    });
  }
};

module.exports = {
  getHashTags,
};
