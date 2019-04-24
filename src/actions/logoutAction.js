import UserSession from '../lib/UserSession/UserSession';
function logoutAction(dispatch){
  UserSession.clear();
  dispatch({
    type: 'LOGOUT_USER'
  })
}

export default logoutAction;