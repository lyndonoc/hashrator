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
    const cachedTags = await cacheClient.get(hashtag, tagType);
    console.log(await cacheClient.get(hashtag));

    if (cachedTags) {
      return success(res, {
        data: JSON.parse(cachedTags),
        isConsecutive: tagType === config.TAG_TYPES.MORE,
      });
    }

    const hashtagUrl = getHashTagPage(hashtag);
    const instaPage = await rp.get(hashtagUrl);
    const tagsMap = mapObjToProps(JSON.parse(instaPage), {
      [config.TAG_TYPES.TOP]: config.TAG_SEARCH_API.topPayloadShape,
      [config.TAG_TYPES.MORE]: config.TAG_SEARCH_API.morePayloadShape,
    });
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

      if (parsedTags.length) {
        cacheClient.set(
          hashtag,
          key,
          JSON.stringify(parsedTags),
          'EX',
          config.REDIS.EXP,
        );
      }

      return {
        ...acc,
        [key]: parsedTags,
      };
    }, {});

    return success(res, {
      data:
        size && start
          ? dataMap[tagType].slice(start, start + size)
          : dataMap[tagType],
      isConsecutive: tagType === config.TAG_TYPES.MORE,
    });
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
