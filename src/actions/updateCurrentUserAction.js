import UserApi from "../api/Users";
import HandleApiError from "../api/HandleApiError";
import {
  actionContexts,
  setErrorAction,
  clearErrorAction,
  refreshUserSessionAction,
} from ".";

const updateCurrentUserAction = (user) => async (dispatch, getState) => {
  try {
    const state = getState();
    dispatch(clearErrorAction);
    await UserApi.update(state.jwt, user);
    dispatch(refreshUserSessionAction(state.jwt));
  } catch (err) {
    const apiError = HandleApiError(err, actionContexts.UPDATE_USER);
    dispatch(setErrorAction(apiError));
  }
};
export default updateCurrentUserAction;
