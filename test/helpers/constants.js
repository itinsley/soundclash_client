const BASE_URL = process.env.BASE_URL || "http://localhost:3000/";
const PASSWORD = process.env.REACT_APP_TEST_PASSWORD;
const OWNER = "api_owner@soundcla.sh";
const OPPONENT = "api_opponent@soundcla.sh";
const SPECTATOR = "api_spectator@soundcla.sh";

module.exports = {
  BASE_URL,
  OWNER,
  OPPONENT,
  SPECTATOR,
  PASSWORD,
};
