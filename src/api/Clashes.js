import axios from 'axios';

const recent = async(accessToken)=>{
  const response = await axios.get('/clashes.json');
  return response.data;
}

const emptyStruct=()=>{
  return { 
    name: '',
    id: '0',
    owner: '',
    opponent: ''
  }
}

export default {
  recent,
  emptyStruct
}