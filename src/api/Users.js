import axios from 'axios';

const get = async(userId)=>{
  const response = await axios.get(`/users/${userId}.json`);
  return response.data;
}

const currentUser = async(jwt) =>{
  const uri = `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/user`
  const response = await axios.get(uri,{
    headers: {
      'Authorization': `bearer ${jwt}`
    }
  });
  return response.data.data;
}

export default {
  get,
  currentUser
}