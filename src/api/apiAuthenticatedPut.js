import axios from "axios";

const apiAuthenticatedPut = async (path, jwt, payload) => {
  const uri = `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/${path}`;

  const response = await axios.put(uri, payload, {
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  });

  return response.data.data;
};

export default apiAuthenticatedPut;
