import React from "react";

function AwaitingPlayer(clash, currentUser){
  return (
    <div className='t-clash-status col-sm-12 text-center p-3' >
      we are waiting for {clash.waiting_for.name}
    </div>
  )
}

export default AwaitingPlayer;