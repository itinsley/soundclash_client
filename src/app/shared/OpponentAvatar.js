import Avatar from "./Avatar";

const OpponentAvatar = (clash) => {
  if (clash.opponent) {
    return (
      <span>
        <strong>{clash.opponent.name}</strong>
        <Avatar
          user={clash.opponent}
          description="Comment user avatar"
          size="35"
        />
      </span>
    );
  } else {
    return clash.opponent_name;
  }
};

export default OpponentAvatar;
