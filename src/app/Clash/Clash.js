import React, { useEffect, Fragment } from "react";
import ClashHeader from "./ClashHeader";
import CurrentRound from "./CurrentRound/CurrentRound";
import RoundsList from "./RoundsList";
import loadingImg from "../../assets/loading.svg";
import ConnectStore from "../../lib/ConnectStore";
import sortRoundsDesc from "../../lib/sortRoundsDesc";
import { fetchClashAction } from "../../actions";

const Clash = ({ dispatch, match, currentClash, currentUser }) => {
  const clashId = match.params.clashId;

  useEffect(() => {
    dispatch(fetchClashAction(clashId));
  }, [dispatch, clashId, currentUser]);

  const clash = currentClash.data;
  const loading = currentClash.loading;

  if (loading) {
    return (
      <div className="container-fluid bg-grey text-center">
        <img src={loadingImg} alt="waiting.." />
      </div>
    );
  } else {
    return (
      <Fragment>
        <ClashHeader clash={clash} />
        <CurrentRound clash={clash} />
        <RoundsList rounds={sortRoundsDesc(clash.rounds)} />
      </Fragment>
    );
  }
};

export default ConnectStore(Clash);
