import apiAuthenticatedGet from "./apiAuthenticatedGet";

const currentUser = async (jwt) => {
  return await apiAuthenticatedGet("user", jwt);
};

const users = {
  currentUser,
};

export default users;
