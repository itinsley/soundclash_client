/**
 *
 * @param {Object} err - Server response or Exception
 * @param {string} context - The context in which it was created. This value is echoed back in the return value
 *
 */
const HandleApiError = (err, errorContext) => {
  let errorMessage = "";
  let type = "";
  let errors = [];
  if (err.response && err.response.data) {
    type = "Validation";
    errorMessage = err.response.data.message;
    errors = err.response.data.errors;
  } else {
    type = "Unhandled";
    errorMessage = err.message;
    console.log("Unhandled exception", err);
  }

  return { errorMessage, errors, type, errorContext };
};

export default HandleApiError;
