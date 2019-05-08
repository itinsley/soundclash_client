import ClashApi from '../api/Clashes';
const fetchClash=(clashId)=>async(dispatch, getState)=>{
  const state = getState();
  const jwt = state.currentUser?state.currentUser.jwt:'';
  const clash = await ClashApi.get(clashId, jwt);
  dispatch({
    type: 'GET_CLASH',
    clash
  })
}

export default fetchClash;