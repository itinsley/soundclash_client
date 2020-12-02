import apiGet from "./apiGet";

const get = async (clashId, roundId) =>
  await apiGet(`clashes/${clashId}/rounds/${roundId}`);

const rounds = { get };

export default rounds;
