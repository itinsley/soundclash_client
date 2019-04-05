import axios from 'axios';

const recent = async(accessToken)=>{
  const response = await axios.get('/clashes.json');
  return response.data;
}

export default {
  recent
}