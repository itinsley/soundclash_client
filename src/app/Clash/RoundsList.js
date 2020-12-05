import React, { Component, Fragment } from "react";
import RoundWrapper from "./Round/RoundWrapper";
class RoundsList extends Component {
  render() {
    return this.props.rounds.map((round, idx) => {
      return (
        <Fragment key={round.id}>
          <div className="row bg-grey">
            <div className="col-sm-12 text-center">
              <RoundWrapper round={round} />
            </div>
          </div>
        </Fragment>
      );
    });
  }
}
export default RoundsList;
