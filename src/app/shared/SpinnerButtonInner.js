import React, { Fragment } from "react";

function SpinnerButtonInner(props) {
  return (
    <Fragment>
      <span
        className="t-spinner spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        hidden={!props.loading}
      ></span>
      <span hidden={props.loading}>{props.label}</span>
    </Fragment>
  );

  return props.label;
}
export default SpinnerButtonInner;
