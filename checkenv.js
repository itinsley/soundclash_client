require('dotenv').config();
const checkEnv = require('check-env');
const required = [
  'REACT_APP_FACEBOOK_APPID',
]

checkEnv(required);