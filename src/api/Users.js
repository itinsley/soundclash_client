import axios from 'axios';

const get = async(userId)=>{
  const response = await axios.get(`/users/${userId}.json`);
  return response.data;
}

const login = async(email, password)=>{
  const params = {
    user: {email, password}
  }
  const response = await axios.post(`/users/auth/api_sessions`, params);
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
  get,
  login
}