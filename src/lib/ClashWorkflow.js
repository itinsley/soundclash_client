const STATES = {
  ReadyToAccept: "ReadyToAccept",
  DisplayInfo: "DisplayInfo",
  Hidden: "Hidden",
  Upload: "Upload",
  AwaitingPlayer: "AwaitingPlayer",
};

const state = (clash, player) => {
  if (clash.state === "challenge_sent") {
    if (player === null) {
      return STATES.Hidden;
    }
    if (clash.opponent && clash.opponent.id === player.id) {
      return STATES.ReadyToAccept;
    }
    if (clash.owner && clash.owner.id === player.id) {
      return STATES.DisplayInfo;
    } else {
      return STATES.Hidden;
    }
  }

  if (clash.state === "awaiting_owner") {
    if (player === null) {
      return STATES.Hidden;
    }
    if (clash.owner.id === player.id) {
      return STATES.Upload;
    } else if (clash.opponent === player) {
      return STATES.AwaitingPlayer;
    } else {
      return STATES.Hidden;
    }
  }
  if (clash.state === "awaiting_opponent") {
    if (player === null || clash.opponent.id !== player.id) {
      return STATES.DisplayInfo;
    } else {
      return STATES.Upload;
    }
  }
};

module.exports = {
  state,
  STATES,
};
