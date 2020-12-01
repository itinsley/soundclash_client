import ClashApi from "../api/Clashes";
import { clearCurrentClashAction } from "./index";

const fetch = async (clashId, state) => {
  if (state.jwt) {
    return ClashApi.getAuthenticated(clashId, state.jwt);
  }

  return ClashApi.get(clashId);
};

const fetchClash = (clashId) => async (dispatch, getState) => {
  dispatch(clearCurrentClashAction);
  const clash = await fetch(clashId, getState());
  dispatch({
    type: "GET_CLASH",
    clash,
  });
};

export default fetchClash;
