import UserApi from "../api/Users";

const fetchCurrentUser = async ({ jwt }) => {
  return UserApi.getCurrent(jwt);
};

export default fetchCurrentUser;
