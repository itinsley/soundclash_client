import React from "react";

function AwaitingPlayer(props){
  const {clash}=props;
  return (
    <div className='t-clash-status col-sm-12 text-center p-3' >
      {clash.waiting_for_description}
    </div>
  )
}

export default AwaitingPlayer;