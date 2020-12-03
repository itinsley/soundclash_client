import UserApi from "../api/Users";
import HandleApiError from "../api/HandleApiError";
import { actionContexts, setErrorAction, clearErrorAction } from ".";

const updateCurrentUserAction = (user) => async (dispatch, getState) => {
  try {
    const jwt = getState().jwt;
    dispatch(clearErrorAction);
    await UserApi.update(jwt, user);
    dispatch({
      type: "SET_USER_SESSION",
      currentUser: user,
      jwt,
    });
  } catch (err) {
    const apiError = HandleApiError(err, actionContexts.UPDATE_USER);
    dispatch(setErrorAction(apiError));
  }
};
export default updateCurrentUserAction;
