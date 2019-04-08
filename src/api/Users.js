import axios from 'axios';

const get = async(userId)=>{
  const response = await axios.get(`/users/${userId}.json`);
  return response.data;
}

const emptyStruct=()=>{
  return { 
    id: '0',
    name: '',
    abbrev_name: '',
    image_url: ''
  }
}

export default {
  emptyStruct,
  get
}