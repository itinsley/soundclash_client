import ClashApi from "../api/Clashes";
import rounds from "../api/Rounds";

const fetch = async (clashId, state) => {
  if (state.jwt) {
    return ClashApi.getAuthenticated(clashId, state.jwt);
  }

  return ClashApi.get(clashId);
};

const fetchClash = (clashId) => async (dispatch, getState) => {
  const clash = await fetch(clashId, getState());
  if (clash.rounds.length > 0) {
    const round = clash.rounds[clash.rounds.length - 1];
    round.expanded = true;
  }
  dispatch({
    type: "SET_CURRENT_CLASH",
    clash,
  });
};

export default fetchClash;
