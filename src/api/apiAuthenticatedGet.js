import axios from "axios";

const apiAuthenticatedGet = async (path, jwt) => {
  const uri = `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/${path}`;

  const response = await axios.get(uri, {
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  });
  // Soundclash Api returns object as 'data'
  return response.data.data;
};

export default apiAuthenticatedGet;
