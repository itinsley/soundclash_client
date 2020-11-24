import axios from "axios";

const apiAuthenticatedPost = async (path, jwt, payload) => {
  const uri = `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/${path}`;

  const response = await axios.post(uri, payload, {
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  });

  return response.data.data;
};

export default apiAuthenticatedPost;
