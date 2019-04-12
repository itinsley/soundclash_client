
const STATES = {
    ReadyToAccept: 1,
    DisplayInfo: 2,
    Hidden: 3,
    Upload: 4
}

const state=(clash, player)=>{
  if (clash.state === 'challenge_sent'){
    if (clash.opponent && clash.opponent.id === player.id){
      return STATES.ReadyToAccept;
    } if (clash.owner === player){
      return STATES.DisplayInfo;
    }
    else{
      return STATES.Hidden;
    } 
  }

  if (clash.state==='awaiting_owner'){
    if(clash.owner===player){
      return STATES.Upload
    } else if (clash.opponent===player){
      return STATES.DisplayInfo;
    } else {
      return STATES.Hidden;
    }
  }
  if(clash.state==='awaiting_opponent'){
    if(clash.opponent===player){
      return STATES.Upload;
    }else {
      return STATES.DisplayInfo;
    }
  }
}

module.exports = {
  state,
  STATES
};