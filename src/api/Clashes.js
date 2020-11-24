import apiAuthenticatedGet from "./apiAuthenticatedGet";
import apiAuthenticatedPost from "./apiAuthenticatedPost";
import apiGet from "./apiGet";

const recent = async () => await apiGet("clashes");

const get = async (clashId) => await apiGet(`clashes/${clashId}`);

const getAuthenticated = async (clashId, jwt) =>
  await apiAuthenticatedGet(`user/current/clashes/${clashId}`, jwt);

const forUser = async (jwt) =>
  await apiAuthenticatedGet(`user/current/clashes`, jwt);

const getChallenge = async (uniqueRef) =>
  await apiGet(`/challenge/${uniqueRef}`);

const acceptChallenge = async (uniqueRef, jwt) =>
  await apiAuthenticatedPost(`challenge/${uniqueRef}`, jwt, {});

/**
 *
 * @param {string} jwt
 * @param {string} clash.name
 * @param {string} clash.commentText
 * @param {string} clash.youTubeUrl
 * @param {string} clash.trackName
 * @param {string} clash.opponentEmailAddress
 */
const create = async (jwt, clash) => {
  const launchClash = {
    launch_clash: {
      clash_name: clash.name,
      comment_text: clash.commentText,
      track_name: clash.trackName,
      youtube_track_url: clash.youTubeUrl,
      opponent_email_address: clash.opponentEmailAddress,
    },
  };

  const response = await apiAuthenticatedPost(`clashes`, jwt, launchClash);
  return response.clash;
};

const clashes = {
  acceptChallenge,
  create,
  forUser,
  get,
  getAuthenticated,
  getChallenge,
  recent,
};

export default clashes;
