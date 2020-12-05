const setRoundExpanded = (roundIndex) => (dispatch, getState) => {
  const state = getState();
  const clash = state.currentClash.data;
  const rounds = clash.rounds.map((round, index) => {
    if (round.index === roundIndex) {
      return { ...round, expanded: true };
    }

    return { ...round };
  });

  dispatch({
    type: "SET_CURRENT_CLASH_ROUNDS",
    rounds,
  });
};

export default setRoundExpanded;
