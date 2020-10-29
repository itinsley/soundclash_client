import React, { Fragment, useState } from "react";
import { Alert } from 'reactstrap';
var startCase = require('lodash.startcase');

const errorList = (errors) => {
  const toListItems=(errors)=>{
    return Object.entries(errors).map(([name, description])=>{
      return (<div key={name}>{startCase(name)} {description} </div>)
    })
  }

  return( <div>{toListItems(errors)}</div> )
}


const ErrorAlertContainer = (props)=>{
  if (!(props.errorMessage || props.errors.size>0)) {
    return null
  }

  const message = props.errorMessage || 'We were unable to create your clash. Please try again. If the problem persists please email support@soundcla.sh';
  return (
    <Alert color="danger">
      <div className="font-weight-bold">{message}</div>
      {errorList(props.errors)}
    </Alert>
  )
}

export default ErrorAlertContainer;