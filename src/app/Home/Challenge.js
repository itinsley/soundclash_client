import React, {Component} from "react";
import SpinnerButtonInner from "../../lib/SpinnerButtonInner";
import youtube from "../../lib/youtube";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'

class Challenge extends Component{
  render(){
    return(
      <div ref={this.scrollReference} className='container-fluid current-round-intro'>
        <div className="t-clash-status mx-auto text-center p-3 challenge" style={{maxWidth: '40.25rem'}}>
          <h1>Challenge someone...</h1>
        </div>
      </div>
    )
  }
}

export default Challenge;