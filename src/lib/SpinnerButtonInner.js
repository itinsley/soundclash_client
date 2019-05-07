import React, {Fragment} from "react";

function SpinnerButtonInner(props){
  if (props.loading){
    return(
      <Fragment>
        <span className="t-spinner spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </Fragment>
    )
  }

  return props.label;
}
export default SpinnerButtonInner;