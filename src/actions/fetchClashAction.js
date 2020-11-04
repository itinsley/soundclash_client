import ClashApi from "../api/Clashes";

const fetch = async (clashId, state) => {
  if (state.jwt) {
    return ClashApi.getAuthenticated(clashId, state.jwt);
  }

  return ClashApi.get(clashId);
};

const fetchClash = (clashId) => async (dispatch, getState) => {
  const clash = await fetch(clashId, getState());
  dispatch({
    type: "GET_CLASH",
    clash,
  });
};

export default fetchClash;
