import React from "react";

function AwaitingPlayer(clash, currentUser){
  if(clash.current_user_is_involved){
    return (
      <div className='col-sm-12 text-center p-3' >
        hello {currentUser.name} we are waiting for {clash.waiting_for.name}
      </div>
    )  
  }
  return null;
}

export default AwaitingPlayer;