const clearError = () => (dispatch) => {
  dispatch({
    type: "CLEAR_ERROR",
  });
};

export default clearError;
