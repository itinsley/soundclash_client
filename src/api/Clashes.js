import axios from 'axios';

const recent = async(accessToken)=>{
  const response = await axios.get('/clashes.json');
  return response.data;
}

const get = async(clashId)=>{
  const response = await axios.get(`/clashes/${clashId}.json`);
  return response.data;
}

const emptyStruct=()=>{
  return { 
    name: '',
    id: '0',
    owner: {name:''},
    opponent: {name:''},
    rounds:[{
      owner_track: {
        name:'',
        track_url:''},
      opponent_track: {
        name:'',
        track_url:''}
      }]
  }
}

export default {
  recent,
  emptyStruct,
  get
}