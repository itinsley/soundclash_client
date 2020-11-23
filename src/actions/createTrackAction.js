import TrackApi from "../api/Tracks";
import HandleApiError from "../api/HandleApiError";
import { actionContexts, setErrorAction, refreshClashAction } from "../actions";

const createTrackAction = (track, clashId) => async (dispatch, getState) => {
  try {
    const state = getState();
    await TrackApi.create(state.jwt, clashId, track);
    dispatch(refreshClashAction);
  } catch (err) {
    const apiError = HandleApiError(err, actionContexts.CREATE_TRACK);
    dispatch(setErrorAction(apiError));
  }
};
export default createTrackAction;
