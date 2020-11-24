import React from "react";
import { Alert } from "reactstrap";
var startCase = require("lodash.startcase");

const listErrors = (errors) => {
  if (!errors) {
    return null;
  }

  // If Error is not an object it will return a number for the property name element
  const displayName = (name) => (isNaN(name) ? name : "");

  const toListItems = (errors) => {
    return Object.entries(errors).map(([name, description]) => {
      const message = `${startCase(displayName(name))} ${description}`;
      return (
        <div id={`err-${name}`} key={name}>
          {message}
        </div>
      );
    });
  };

  return <div>{toListItems(errors)}</div>;
};

const ErrorAlertContainer = ({ errorMessage, errors }) => {
  if (!errorMessage && (errors || []).length === 0) {
    return null;
  }

  const message =
    errorMessage ||
    "Unhandled exception occurred. Please try again. If the problem persists please email support@soundcla.sh";
  return (
    <Alert color="danger" className="t-error-alert">
      <div className="font-weight-bold">{message}</div>
      {listErrors(errors)}
    </Alert>
  );
};

export default ErrorAlertContainer;
