require("dotenv").config();
const login = require("../helpers/login");

const {
  BASE_URL,
  OWNER,
  OPPONENT,
  SPECTATOR,
  PASSWORD,
} = require("../helpers/constants");
const { faPause } = require("@fortawesome/free-solid-svg-icons");

module.exports = {
  "Error handling:: upload track": async function (browser) {
    // Clash with status of awaiting_opponent
    // Force an error by sending values without waiting for youtube data to be extracted
    await browser.url(BASE_URL);
    browser.waitForElementVisible("#login");
    await login(browser, OPPONENT, PASSWORD);
    browser.click("partial link text", "API::awaiting_opponent");
    browser.waitForElementVisible(".t-clash-header");
    browser.verify.containsText(".t-clash-status", "Now it's your turn");
    browser.setValue("input[name='youTubeUrl']", "invalid value");
    browser.setValue("textarea[name='commentText']", "placeholder");

    browser.click("button.t-btn-submit");
    await browser.waitForElementVisible(".t-error-alert");
    browser.verify.containsText(".t-error-alert", "Track has errors");
  },
};
