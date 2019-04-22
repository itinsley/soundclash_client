import ClashApi from '../../../api/Clashes';

function currentUserJwt(state){
  const currentUser = state.currentUser;
  return currentUser?currentUser.jwt:null
}

async function fetchMyClashesAction(dispatch, getState){
  const state = getState()
  const jwt = currentUserJwt(state);
  if (jwt){
    const myClashes = await ClashApi.forUser(jwt)
    dispatch({
      type: 'GET_MY_CLASHES',
      myClashes
    })
  }
}

export default fetchMyClashesAction;