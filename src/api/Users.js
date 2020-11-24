import authenticatedGet from "./authenticatedGet";

const currentUser = async (jwt) => {
  return await authenticatedGet("user", jwt);
};

const users = {
  currentUser,
};

export default users;
