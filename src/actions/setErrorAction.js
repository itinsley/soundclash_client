/**
 *
 * @param {Object} error - Error object
 * @param {string} error.errorMessage - Text error message
 * @param {Object} errors - Object with  list of errors as key/value
 * @param {string} errors.error1 - Text description for property
 * @param {string} errors.error2
 * @param {string} errors.error3
 */
const setError = (error) => (dispatch) => {
  dispatch({
    type: "SET_ERROR",
    error: error,
  });
};

export default setError;
