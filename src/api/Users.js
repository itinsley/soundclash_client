import apiAuthenticatedGet from "./apiAuthenticatedGet";

/*
 * Gets the user from Soundclash API
 * If the user does not exist, it is created from the values in the JWT
 */
const getOrCreateCurrentUser = async (jwt) => {
  return await apiAuthenticatedGet("user", jwt);
};

const users = {
  getOrCreateCurrentUser,
};

export default users;
