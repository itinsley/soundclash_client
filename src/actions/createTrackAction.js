import TrackApi from "../api/Tracks";
import refreshClashAction from "./refreshClashAction";

const createTrackAction = (track) => async (dispatch, getState) => {
  const state = getState();
  const currentUser = state.currentUser;
  const clashId = state.currentClash.data.id;
  await TrackApi.create(currentUser.jwt, clashId, track);
  dispatch(refreshClashAction);
};
export default createTrackAction;
