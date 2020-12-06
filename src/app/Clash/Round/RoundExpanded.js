import React, { useState, useEffect, useRef } from "react";
import Round from "./Round";
import Loading from "../../shared/Loading";
import RoundApi from "../../../api/Rounds";
import ConnectStore from "../../../lib/ConnectStore";

const scrollIntoView = (ref) => {
  if (!ref.current) return;

  ref.current.scrollIntoView({
    block: "center",
    behavior: "smooth",
  });
};

function RoundExpanded({ currentClash, round }) {
  const [roundDetail, setRoundDetail] = useState(null);
  const clashId = currentClash.data.id;
  const scrollReference = useRef(null);

  useEffect(() => {
    RoundApi.get(clashId, round.id).then((roundDetail) => {
      setRoundDetail(roundDetail);
      if (round.scrollIntoView) scrollIntoView(scrollReference);
    });
  }, [clashId, round, scrollReference]);

  if (!roundDetail) {
    return <Loading />;
  } else {
    return (
      <div ref={scrollReference}>
        <Round round={roundDetail} />
      </div>
    );
  }
}

export default ConnectStore(RoundExpanded);
