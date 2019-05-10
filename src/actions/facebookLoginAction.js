import UserSession from '../lib/UserSession/UserSession';
import fetchMyClashesAction from './fetchMyClashesAction';
import FacebookSession from '../api/FacebookSession';

const facebookLoginAction=(fbResponse)=> async(dispatch)=>{
  const accessToken = fbResponse["accessToken"];

  //Get Session from Soundclash server using facebooktoken
  const sessionResponse = await FacebookSession.create(accessToken)
  const currentUser = UserSession.set(sessionResponse.jwt);
  dispatch({
    type: 'LOGIN_USER',
    currentUser
  });
  dispatch(fetchMyClashesAction);
}

export default facebookLoginAction;