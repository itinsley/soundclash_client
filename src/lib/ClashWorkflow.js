
const STATES = {
    ReadyToAccept: 'ReadyToAccept',
    DisplayInfo: 'DisplayInfo',
    Hidden: 'Hidden',
    Upload: 'Upload'
}

const state=(clash, player)=>{
  if (clash.state === 'challenge_sent'){
    if (player===null){
      return STATES.Hidden;
    }
    if (clash.opponent && clash.opponent.id === player.id){
      return STATES.ReadyToAccept;
    } if (clash.owner && clash.owner.id === player.id){
      return STATES.DisplayInfo;
    }
    else{
      return STATES.Hidden;
    }
  }

  if (clash.state==='awaiting_owner'){
    if (player===null){
      return STATES.Hidden;
    }
    if(clash.owner.id===player.id){
      return STATES.Upload
    } else if (clash.opponent===player){
      return STATES.DisplayInfo;
    } else {
      return STATES.Hidden;
    }
  }
  if(clash.state==='awaiting_opponent'){
    if (player===null){
      return STATES.DisplayInfo;
    }
    if(clash.opponent.id===player.id){
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