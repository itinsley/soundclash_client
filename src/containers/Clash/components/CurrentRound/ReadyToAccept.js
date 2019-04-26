import React from "react";
import Track from "../Track/Track";

function ReadyToAccept(clash, currentUser){
  const owner_track = clash.owner_track;

  return (
    <div className='col-sm-12 text-center p-3' >
      <div className="container-fluid bg-grey px-0">
        <div className='row p-4'>
          <div className='t-track-owner-container col-sm-6 text-center p-3' >
            <Track track = {owner_track}
                  currentUser = {currentUser} />
          </div>
          <div className='t-track-opponent-container col-sm-6 text-center p-3' >
            <h2 className='text-truncate p-4 clash-item__header' >Waiting for you</h2>
            <div>You have been challenged to a soundclash by {clash.owner.name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReadyToAccept;