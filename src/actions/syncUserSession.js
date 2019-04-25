import userSession from '../lib/UserSession/UserSession';

function syncUserSession(dispatch){
  dispatch({
    type: 'SYNC_USER_SESSION',
    currentUser: userSession.get()
  })
}

export default syncUserSession;