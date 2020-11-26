import apiAuthenticatedGet from "./apiAuthenticatedGet";
import apiAuthenticatedPut from "./apiAuthenticatedPut";

/*
 * Gets the user from Soundclash API
 * If the user does not exist, it is created from the values in the JWT
 */
const getOrCreateCurrentUser = async (jwt) => {
  return await apiAuthenticatedGet("user", jwt);
};

const update = async (jwt, user) => {
  const path = `user/${user.id}`;
  return await apiAuthenticatedPut(path, jwt, permittedValues(user));
};

const permittedValues = (user) => {
  return {
    name: user.name,
    image_url: user.image_url,
    unsubscribed: user.unsubscribed,
  };
};

const users = {
  getOrCreateCurrentUser,
  update,
};

export default users;
