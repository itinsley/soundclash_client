import Users from "../api/Users";
import { fetchMyClashesAction } from "../actions";

const setUserSession = (jwt) => async (dispatch) => {
  try {
    const soundClashUser = await Users.getOrCreateCurrentUser(jwt);
    dispatch({
      type: "SET_USER_SESSION",
      currentUser: {
        id: soundClashUser.id,
        name: soundClashUser.name,
        email: soundClashUser.email,
        sub: soundClashUser.sub,
        // image_url: auth0User.picture,
        unsubscribed: soundClashUser.unsubscribed,
      },
      jwt: jwt,
    });
  } catch (e) {
    console.log("failed to retrieve user", e);
    dispatch({
      type: "SET_USER_SESSION_ERROR",
      errorMessage: "Failed to retrieve user session",
    });
  }

  dispatch(fetchMyClashesAction);
};

export default setUserSession;
