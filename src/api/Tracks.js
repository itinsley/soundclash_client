import apiAuthenticatedPost from "./apiAuthenticatedPost";
import apiGet from "./apiGet";

const forClash = async (clashId) => await apiGet(`clashes/${clashId}/tracks`);

/**
 *
 * @param {string} jwt
 * @param {number} clashId
 * @param {Object} track
 * @param {string} track.name
 * @param {string} track.commentText
 * @param {string} track.youTubeUrl
 */
const create = async (jwt, clashId, track) => {
  const payload = {
    track: {
      url: track.youTubeUrl,
      comment_text: track.commentText,
      name: track.name,
    },
  };

  return await apiAuthenticatedPost(`clashes/${clashId}/tracks`, jwt, payload);
};

const tracks = { forClash, create };
export default tracks;
