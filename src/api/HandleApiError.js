const HandleApiError = (err) => {
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
  }

  return { errorMessage, errors, type };
};

export default HandleApiError;
