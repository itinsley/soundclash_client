
const setUserSession=(auth0User)=> async(dispatch)=>{
  dispatch({
    type: 'SET_USER_SESSION',
    currentUser: auth0User
  })
}

export default setUserSession;