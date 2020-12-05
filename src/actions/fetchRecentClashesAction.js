import ClashApi from "../api/Clashes";
async function fetchRecentClashes(dispatch) {
  const recentClashes = await ClashApi.recent();
  dispatch({
    type: "SET_RECENT_CLASHES",
    recentClashes,
  });
}

export default fetchRecentClashes;
