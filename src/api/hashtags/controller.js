const rp = require('request-promise');

const { checkObjProps } = require('../../lib/check-obj-prop');
const { getHashTagPage } = require('../../lib/url');
const { parseHashTags } = require('../../lib/hashtags');
const { TAG_SEARCH_API: tagSearchApi } = require('../../config');
const { success } = require('../../lib/responses');

const getHashTags = async (req, res) => {
  const { hashtag } = req.params;

  if (!hashtag) {
    return success(res, {
      data: [],
    });
  }

  try {
    const hashtagUrl = getHashTagPage(hashtag);
    const instaPage = await rp.get(hashtagUrl + '/?__a=1');
    const edges = checkObjProps(
      JSON.parse(instaPage),
      tagSearchApi.topPayloadShape
    );

    const rawText = edges
      ? edges
        .map((edge) => {
          const nodeEdge = checkObjProps(
            edge,
            tagSearchApi.nodeShape
          );
          return nodeEdge
            ? nodeEdge[0] && nodeEdge[0].node && nodeEdge[0].node.text
            : '';
        })
        .join(' ')
      : '';

    const data = Array.from(new Set(parseHashTags(rawText)));

    return success(res, {
      data,
      isConsecutive: false,
    });
  } catch (err) {
    console.error(err);
    return success(res, {
      data: [],
    });
  }
};

const getMoreHashTags = async (req, res) => {
  const { hashtag } = req.params;

  if (!hashtag) {
    return success(res, {
      data: [],
    });
  }

  try {
    const hashtagUrl = getHashTagPage(hashtag);
    const instaPage = await rp.get(hashtagUrl + '/?__a=1');
    const edges = checkObjProps(
      JSON.parse(instaPage),
      tagSearchApi.morePayloadShape
    );

    const rawText = edges
      ? edges
        .map((edge) => {
          const nodeEdge = checkObjProps(
            edge,
            tagSearchApi.nodeShape
          );
          return nodeEdge
            ? nodeEdge[0] && nodeEdge[0].node && nodeEdge[0].node.text
            : '';
        })
        .join(' ')
      : '';

    const data = Array.from(new Set(parseHashTags(rawText)));

    return success(res, {
      data,
      isConsecutive: true,
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
  getMoreHashTags,
};
