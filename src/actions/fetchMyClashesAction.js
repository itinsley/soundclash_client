import ClashApi from "../api/Clashes";

async function fetchMyClashesAction(dispatch, getState) {
  const state = getState();
  if (state.jwt) {
    const myClashes = await ClashApi.forUser(state.jwt);
    dispatch({
      type: "GET_MY_CLASHES",
      myClashes,
      loading: false,
    });
  }
}

export default fetchMyClashesAction;
