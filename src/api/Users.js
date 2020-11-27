import apiAuthenticatedGet from "./apiAuthenticatedGet";
import apiAuthenticatedPut from "./apiAuthenticatedPut";
import axios from "axios";

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

const unsubscribe = async (unsubscribeId) => {
  const uri = `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/user_unsubscribe/${unsubscribeId}`;
  const response = await axios.post(uri);
  return response.data.message;
};

const users = {
  getOrCreateCurrentUser,
  update,
  unsubscribe,
};

export default users;
