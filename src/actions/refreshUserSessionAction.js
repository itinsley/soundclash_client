import UserApi from "../api/Users";
import { fetchMyClashesAction, refreshClashAction } from ".";

const refreshUserSession = (jwt, auth0User) => async (dispatch, getState) => {
  const addProperties = async (soundClashUser, auth0User) => {
    if (soundClashUser.image_url || !auth0User.picture) {
      return soundClashUser;
    }

    return await UserApi.update(jwt, {
      ...soundClashUser,
      image_url: auth0User.picture,
    });
  };

  const state = getState();

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
  if (state.currentClash.data) dispatch(refreshClashAction);
};

export default refreshUserSession;
