import axios from 'axios';

const create = async(accessToken)=>{
  const response = await axios.post('/users/auth/api_sessions', {
    AccessToken: accessToken
  })
  return {jwt: response['data']['jwt']}
}

export default {
  create
}