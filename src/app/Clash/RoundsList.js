import React, {Component, Fragment} from "react";
import RoundWrapper from "./Round/RoundWrapper";
class RoundsList extends Component {
  render(){
    return this.props.rounds.map((round, idx)=>{
      return (
        <Fragment
          key={round.id}  >
          <div className='row' >
            <div className='col-sm-12 text-center' >
              <RoundWrapper
                isOpen={idx===0}
                round={round}
                currentUser = {this.props.currentUser}
                />
            </div>
          </div>
        </Fragment>
      )
    })
  }
}
export default RoundsList;