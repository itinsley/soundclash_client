import ClashApi from '../api/Clashes';
import fetchMyClashesAction from './fetchMyClashesAction';
import history from '../history';

const createClashAction=(clash)=>async(dispatch, getState)=>{
  const state = getState();
  try{
    dispatch({type: 'CREATE_CLASH_POST'});
    const response = await ClashApi.create(state.jwt, clash);
    const newClash = response.data.data.clash;
    dispatch({type: 'CREATE_CLASH_SUCCESS',
      clash
    });
    history.push(`/clashes/${newClash.id}`)
  } catch(err) {
    let message='';
    let type='';
    if (err.response){
      type = 'Validation';
      message = err.response.data.message;
    } else {
      type = 'Unhandled';
      message = err.message;
    }
    dispatch({
      type: 'CREATE_CLASH_ERROR',
      clash,
      errors: [{type, message}]
    })
  }
}
export default createClashAction;