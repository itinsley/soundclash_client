import UserSession from '../lib/UserSession/UserSession';
import UserApi from '../api/Users';

const loginAction=(email, password)=> async(dispatch)=>{
  const response = await UserApi.login(email, password );
  const currentUser = UserSession.set(response.jwt);
  dispatch({
    type: 'LOGIN_USER',
    currentUser
  })
}

export default loginAction;