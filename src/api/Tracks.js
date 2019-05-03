import axios from 'axios';

/**
 *
 * @param {string} jwt
 * @param {number} clashId
 * @param {Object} track
 * @param {string} track.name
 * @param {string} track.commentText
 * @param {string} track.youTubeUrl
 */
const create= async(jwt, clashId, track)=>{
  const uri = `/api/clashes/${clashId}/tracks?jwt=${jwt}`
  const response = await axios.post(uri, {
            url: track.youTubeUrl,
            comment_text: track.commentText,
            name: track.name
          });
  return response;
}

export default{
  create
}