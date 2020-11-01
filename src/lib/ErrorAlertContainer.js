import React, { Fragment, useState } from "react";
import { Alert } from "reactstrap";
var startCase = require("lodash.startcase");

const errorList = (errors) => {
  const toListItems = (errors) => {
    return Object.entries(errors).map(([name, description]) => {
      const message = `${startCase(name)} ${description}`;
      return <div key={name}>{message}</div>;
    });
  };

  return <div>{toListItems(errors)}</div>;
};

const ErrorAlertContainer = (props) => {
  if (!props.errorMessage && (props.errors || []).length == 0) {
    return null;
  }

  const message =
    props.errorMessage ||
    "Unhandled exception occurred. Please try again. If the problem persists please email support@soundcla.sh";
  return (
    <Alert color="danger">
      <div className="font-weight-bold">{message}</div>
      {props.errors && errorList(props.errors)}
    </Alert>
  );
};

export default ErrorAlertContainer;
