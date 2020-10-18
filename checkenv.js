require('dotenv').config();
const checkEnv = require('check-env');
const required = [
  'REACT_APP_YOUTUBE_API_KEY',
]

checkEnv(required);