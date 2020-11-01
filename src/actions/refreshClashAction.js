import fetchClashAction from "../actions/fetchClashAction";

const refreshClash = async (dispatch, getState) => {
  const state = getState();
  dispatch(fetchClashAction(state.currentClash.data.id));
};

export default refreshClash;
