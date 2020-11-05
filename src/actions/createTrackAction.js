import TrackApi from "../api/Tracks";
import HandleApiError from "../api/HandleApiError";
import { setErrorAction, refreshClashAction } from "../actions";

const createTrackAction = (track, clashId) => async (dispatch, getState) => {
  try {
    const state = getState();
    await TrackApi.create(state.jwt, clashId, track);
    dispatch(refreshClashAction);
  } catch (err) {
    const error = HandleApiError(err);
    dispatch(setErrorAction(error));
  }
};
export default createTrackAction;
