require("dotenv").config();
const checkEnv = require("check-env");
const required = [
  "REACT_APP_YOUTUBE_API_KEY",
  "REACT_APP_SOUNDCLASH_API_BASE_URI",
  "REACT_APP_AUTH0_DOMAIN",
  "REACT_APP_AUTH0_CLIENT_ID",
  "REACT_APP_AUTH0_AUDIENCE",
];

checkEnv(required);
