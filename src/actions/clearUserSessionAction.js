const clearUserSession = () => (dispatch) => {
  dispatch({
    type: "CLEAR_USER_SESSION",
  });
};

export default clearUserSession;
