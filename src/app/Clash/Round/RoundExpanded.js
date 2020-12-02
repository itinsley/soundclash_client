import React, { useState, useEffect } from "react";
import Round from "./Round";
import Loading from "../../shared/Loading";
import RoundApi from "../../../api/Rounds";
import ConnectStore from "../../../lib/ConnectStore";

function RoundExpanded({ currentClash, round }) {
  const [roundDetail, setRoundDetail] = useState(null);
  const clashId = currentClash.data.id;

  useEffect(() => {
    RoundApi.get(clashId, round.id).then((roundDetail) => {
      setRoundDetail(roundDetail);
    });
  }, [clashId, round]);

  if (!roundDetail) {
    return <Loading />;
  } else {
    return <Round round={roundDetail} />;
  }
}

export default ConnectStore(RoundExpanded);
