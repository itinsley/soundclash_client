import axios from "axios";

const apiGet = async (path) => {
  const uri = `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/${path}`;
  const response = await axios.get(uri);

  // Soundclash Api returns object as 'data'
  return response.data.data;
};

export default apiGet;
