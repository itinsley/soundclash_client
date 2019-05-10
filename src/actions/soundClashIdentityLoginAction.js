import UserSession from '../lib/UserSession/UserSession';
import UserApi from '../api/Users';
import fetchMyClashesAction from './fetchMyClashesAction';

const loginAction=(email, password)=> async(dispatch)=>{
  const response = await UserApi.login(email, password );
  const currentUser = UserSession.set(response.jwt);
  dispatch({
    type: 'LOGIN_USER',
    currentUser
  });
  dispatch(fetchMyClashesAction);
}

export default loginAction;