const setRoundExpanded = (roundIndex, scrollIntoView) => (
  dispatch,
  getState
) => {
  const state = getState();
  const clash = state.currentClash.data;
  const rounds = clash.rounds.map((round) =>
    round.index === roundIndex
      ? { ...round, expanded: true, scrollIntoView }
      : round
  );

  dispatch({
    type: "SET_CURRENT_CLASH_ROUNDS",
    rounds,
  });
};

export default setRoundExpanded;
