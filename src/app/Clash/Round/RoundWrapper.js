import React, { Component } from "react";
import RoundCompressed from "./RoundCompressed";
import RoundExpanded from "./RoundExpanded";

class RoundWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
    };
    this.Handle_Click = this.Handle_Click.bind(this);
  }

  Handle_Click(event) {
    this.setState({ isOpen: true });
    event.preventDefault();
  }

  render() {
    const round = this.props.round;
    if (round.expanded) {
      return (
        <div className="container-gutters">
          <RoundExpanded round={round} />
        </div>
      );
    } else {
      return <RoundCompressed round={round} Handle_Click={this.Handle_Click} />;
    }
  }
}

export default RoundWrapper;
