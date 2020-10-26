import React, { useState } from "react";
import { Alert } from 'reactstrap';

const ErrorAlertContainer = (props)=>{
  if (!(props.errors && props.errors.length>0)) {
    return null
  }
  console.log(props.errors)
  return (
    <Alert color="danger">
      {props.message}
    </Alert>
  )
}

export default ErrorAlertContainer;