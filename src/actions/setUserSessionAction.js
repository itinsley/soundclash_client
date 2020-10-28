import Users from "../api/Users";

const setUserSession=(auth0User, jwt)=> async(dispatch)=>{

  const soundClashUser = await Users.currentUser(jwt);

  dispatch({
    type: 'SET_USER_SESSION',
    currentUser: {
      id: soundClashUser.id,
      name: soundClashUser.name,
      email: soundClashUser.email,
      sub:  soundClashUser.sub,
      picture: auth0User.picture
    },
    jwt: jwt
  })
}

export default setUserSession;