import ClashApi from '../api/Clashes';
import fetchMyClashesAction from './fetchMyClashesAction';
import history from '../history';

const createClashAction=(newClash)=>async(dispatch, getState)=>{
  const state = getState();
  const currentUser = state.currentUser;
  const response = await ClashApi.create(currentUser.jwt, newClash);
  const clash = response.data;
  dispatch(fetchMyClashesAction);
  history.push(`/clashes/${clash.id}`)
}
export default createClashAction;