import axios from 'axios';

const recent = async()=>{
  const response = await axios.get('/clashes.json');
  return response.data;
}

const get = async(clashId)=>{
  const response = await axios.get(`/clashes/${clashId}.json`);
  return response.data;
}

const forUser = async(jwt)=>{
  const response = await axios.get(`/api/user/clashes.json?jwt=${jwt}`);
  return response.data;
}

export default {
  recent,
  get,
  forUser  
}