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
  "View Clash:: - spectator, not logged in": async function (browser) {
    await browser.url(BASE_URL);
    browser.waitForElementVisible(".card");
    browser.verify.containsText("h2", "Recent Clashes");
    browser.click("partial link text", "API::awaiting_owner");
    browser.verify.containsText("h1", "API::awaiting_owner");

    // My Clashes:: - spectator, not logged in
    browser.click(".navbar-brand");
    browser.waitForElementVisible(".card");
    browser.assert.not.elementPresent(".t-myclashes-header");

    // With status of awaiting_owner
    browser.click(".navbar-brand");
    browser.click("partial link text", "API::awaiting_owner");
    browser.verify.containsText(".t-clash-status", "Waiting for Api Owner");
  },

  "My Clashes:: logged in as clash owner": async function (browser) {
    // With status of challenge_sent
    await browser.url(BASE_URL);
    await login(browser, OWNER, PASSWORD);

    // I can challenge someone
    browser.verify.containsText(".challenge h1", "Challenge someone...");

    // My clashes
    browser.click("partial link text", "API::challenge_sent");
    browser.waitForElementVisible(".t-clash-header");
    browser.verify.containsText(".t-clash-status", `Waiting for ${OPPONENT}`);

    // With status of awaiting_owner
    browser.click(".navbar-brand");
    browser.waitForElementVisible(".t-myclashes-container");
    browser.verify.containsText("h1.t-myclashes-header", "My Clashes");
    browser.waitForElementVisible(".t-card-title");
    browser.click("partial link text", "API::awaiting_owner");
    browser.waitForElementVisible(".t-clash-status");
    browser.verify.containsText(".t-clash-status", "Api Opponent");
    browser.verify.containsText(".t-clash-status", "just played");
    browser.verify.containsText(".t-clash-status", "Now it's your turn...");
    await browser.click("#logout");
  },

  "My Clashes:: logged in as clash opponent": async function (browser) {
    // Clash with status of awaiting_owner
    await browser.url(BASE_URL);
    browser.waitForElementVisible("#login");
    await login(browser, OPPONENT, PASSWORD);
    browser.waitForElementVisible(".t-myclashes-container");
    browser.waitForElementVisible(".t-card-title");
    browser.click("partial link text", "API::awaiting_owner");
    browser.waitForElementVisible(".t-clash-header");
    browser.verify.elementPresent("iframe");
    browser.verify.containsText(".t-clash-status", "Waiting for Api Owner");

    // Clash with status of awaiting_opponent
    browser.click(".navbar-brand");
    browser.click("partial link text", "API::awaiting_opponent");
    browser.waitForElementVisible(".t-clash-header");
    browser.verify.containsText(".t-clash-status", "Now it's your turn");
    browser.setValue(
      "input[name='youTubeUrl']",
      "https://www.youtube.com/watch?v=-KIm0Je4phY"
    );
    browser.setValue("textarea[name='commentText']", "Owner's revenge");
    browser.waitForElementVisible(".t-track-title");

    // Youtube integration, depends on track existing..
    browser.verify.containsText(
      ".t-track-title",
      "Friends by Amii Stewart (12 in version - VERY CLEAR)"
    );
    // Don't submit the track as this will break the tests next time.

    // Clash with status of challenge_sent
    browser.click(".navbar-brand");
    browser.verify.containsText(".clash-tile", "Api Owner vs. Api Opponent");
    browser.click("partial link text", "API::challenge_sent");
    browser.waitForElementVisible(".t-clash-header");
    browser.verify.elementPresent("iframe");
    browser.verify.containsText(
      ".t-track-opponent-container",
      "Waiting for you"
    );
    browser.verify.containsText(
      ".t-track-opponent-container",
      "You have been challenged to a soundclash by Api Owner"
    );
    browser.end();
  },

  "My Clashes:: challenge_sent - logged in spectator": async function (
    browser
  ) {
    await browser.url(BASE_URL);
    await login(browser, SPECTATOR, PASSWORD);
    browser.assert.not.elementPresent(".t-myclashes-header .clash-tile");
    browser.end();
  },

  "Create Clash:: logged in as clash owner": async function (browser) {
    await browser.url(BASE_URL);
    await login(browser, OWNER, PASSWORD);
    browser.setValue("input[name='clashName']", "A new Clash Owner Clash..");
    browser.setValue(
      "input[name='opponentEmailAddress']",
      "doesnt.exist@yet.com"
    );
    browser.setValue(
      "input[name='youTubeUrl']",
      "https://www.youtube.com/watch?v=-KIm0Je4phY"
    );
    browser.setValue(
      "textarea[name='commentText']",
      "New clash for unregistered user"
    );
    browser.waitForElementVisible(".t-track-title");
    browser.click("button#createTrack");
    browser.waitForElementVisible(".t-clash-header");
    browser.verify.containsText("h1", "A new Clash Owner Clash..");
  },
};
