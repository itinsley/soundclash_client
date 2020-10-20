import ClashApi from '../api/Clashes';
import fetchMyClashesAction from './fetchMyClashesAction';
import history from '../history';

const createClashAction=(newClash)=>async(dispatch, getState)=>{
  const state = getState();
  const response = await ClashApi.create(state.jwt, newClash);
  const clash = response.data.data.clash;
  dispatch(fetchMyClashesAction);
  history.push(`/clashes/${clash.id}`)
}
export default createClashAction;