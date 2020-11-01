import axios from "axios";

const create = async (trackId, commentText, jwt) => {
  const uri = `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/tracks/${trackId}/comments`;
  const comment = {
    comment: { comment_text: commentText },
  };
  return await axios.post(uri, comment, {
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  });
};

export default {
  create,
};
