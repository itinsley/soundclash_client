import setRoundExpandedAction from "../../../actions/setRoundExpandedAction";
import ConnectStore from "../../../lib/ConnectStore";

const RoundCompressed = ({ round, dispatch }) => {
  const expandRound = (e) => {
    e.preventDefault();
    dispatch(setRoundExpandedAction(round.index));
  };

  return (
    <a
      href={`/rounds/${round.id}.json`}
      className="py-3 round-thumb u-overlay-hover"
      onClick={expandRound}
    >
      <strong>
        <span className="text-uppercase">Round {round.index}</span>
        <img
          className="ml-4 mr-1"
          alt="Tracks icon"
          src="https://res.cloudinary.com/soundclash/image/asset/comment-f01f9b1834a2e2bc80dae34d5cf70df3.svg"
          width="20"
        />
        {round.comment_count}
      </strong>
      <h3 style={{ fontSize: "150%", fontWeight: "300" }}>
        {round.owner_track_name}
      </h3>
      <h3 style={{ fontSize: "150%", fontWeight: "300" }}>
        {round.opponent_track_name}
      </h3>
    </a>
  );
};

export default ConnectStore(RoundCompressed);
