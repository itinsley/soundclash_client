import UserApi from "../api/Users";
import { fetchMyClashesAction } from ".";

const refreshUserSession = (jwt, auth0User) => async (dispatch) => {
  const addProperties = async (soundClashUser, auth0User) => {
    if (soundClashUser.image_url || !auth0User.picture) {
      return soundClashUser;
    }

    return await UserApi.update(jwt, {
      ...soundClashUser,
      image_url: auth0User.picture,
    });
  };

  try {
    const currentUser = await UserApi.getOrCreateCurrentUser(jwt).then(
      (soundClashUser) => {
        return addProperties(soundClashUser, auth0User);
      }
    );

    dispatch({
      type: "SET_USER_SESSION",
      currentUser,
      jwt,
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

export default refreshUserSession;
