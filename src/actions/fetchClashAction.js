import ClashApi from "../api/Clashes";

const fetch = async (clashId, state) => {
  if (state.jwt) {
    return ClashApi.getAuthenticated(clashId, state.jwt);
  }

  return ClashApi.get(clashId);
};

const fetchClash = (clashId) => async (dispatch, getState) => {
  // To avoid race condition with user Auth, set the ID of the clash being retrieved immediately
  // so that clash can be reloaded after Auth is completed
  dispatch({ type: "SET_CLASH_LOADING", clashId });

  const clash = await fetch(clashId, getState());
  if (clash.rounds.length > 0) {
    const round = clash.rounds[clash.rounds.length - 1];
    round.expanded = true;
  }
  return dispatch({
    type: "SET_CURRENT_CLASH",
    clash,
  });
};

export default fetchClash;
