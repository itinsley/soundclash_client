import ClashApi from '../api/Clashes';
async function fetchClash(dispatch, clashId, currentUser=null){
  const jwt = currentUser?currentUser.jwt:'';
  const clash = await ClashApi.get(clashId, jwt);
  dispatch({
    type: 'GET_CLASH',
    clash
  })
}

export default fetchClash;