import axios from "axios";

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
  const uri = `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/clashes/${clashId}/tracks`;
  const payload = {
    track: {
      url: track.youTubeUrl,
      comment_text: track.commentText,
      name: track.name,
    },
  };

  return await axios.post(uri, payload, {
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  });
};

const tracks = { create };
export default tracks;
