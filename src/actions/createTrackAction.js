import TrackApi from "../api/Tracks";
import HandleApiError from "../api/HandleApiError";
import { setErrorAction, refreshClashAction } from "../actions";

const createTrackAction = (track, clashId) => async (dispatch, getState) => {
  try {
    const state = getState();
    await TrackApi.create(state.jwt, clashId, track);
    dispatch(refreshClashAction);
  } catch (err) {
    const apiError = HandleApiError(err);
    dispatch(setErrorAction(apiError));
  }
};
export default createTrackAction;
