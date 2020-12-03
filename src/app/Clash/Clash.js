import React, { useEffect, Fragment } from "react";
import ClashHeader from "./ClashHeader";
import CurrentRound from "./CurrentRound/CurrentRound";
import RoundsList from "./RoundsList";
import loadingImg from "../../assets/loading.svg";
import ConnectStore from "../../lib/ConnectStore";
import sortByIndex from "../../lib/sortByIndex";
import { fetchClashAction } from "../../actions";
import PlayAllTracksButton from "./PlayAllTracksButton";
import { clearCurrentClashAction } from "../../actions";

const Clash = ({ dispatch, match, currentClash, currentUser }) => {
  const clashId = match.params.clashId;

  useEffect(() => {
    dispatch(clearCurrentClashAction);
    dispatch(fetchClashAction(clashId));
  }, [dispatch, clashId, currentUser]);

  const clash = currentClash.data;
  const loading = currentClash.loading;

  if (loading) {
    return (
      <div className="container-fluid bg-grey text-center top-element-margin">
        <img src={loadingImg} alt="waiting.." />
      </div>
    );
  } else {
    return (
      <Fragment>
        <PlayAllTracksButton clash={clash} />
        <ClashHeader clash={clash} />
        <CurrentRound clash={clash} />
        <RoundsList rounds={sortByIndex.desc(clash.rounds)} />
      </Fragment>
    );
  }
};

export default ConnectStore(Clash);
