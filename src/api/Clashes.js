import axios from 'axios';

const recent = async()=>{
  const response = await axios.get('/clashes.json');
  return response.data;
}

const get = async(clashId)=>{
  const response = await axios.get(`/clashes/${clashId}.json`);
  return response.data;
}

export default {
  recent,
  get
}