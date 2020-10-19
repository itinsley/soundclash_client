
const setUserSession=(auth0User, jwt)=> async(dispatch)=>{
  dispatch({
    type: 'SET_USER_SESSION',
    currentUser: auth0User,
    jwt: jwt
  })
}

export default setUserSession;