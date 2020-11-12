const login = require("../helpers/login");
const { BASE_URL, OWNER, PASSWORD } = require("../helpers/constants");
const clickElementBySelector = require("../helpers/clickElementBySelector");
const assertTextInElements = require("../helpers/assertTextInElements");
const { faPause } = require("@fortawesome/free-solid-svg-icons");

module.exports = {
  "Comments:: - I can add a comment": async function (browser) {
    const comment = `A comment ts: ${Date.now()}`;
    await browser.url(BASE_URL);
    await login(browser, OWNER, PASSWORD);
    browser.waitForElementVisible(".card");
    await clickElementBySelector(
      browser,
      ".t-card-title",
      "API::awaiting_owner"
    );
    browser.waitForElementVisible(".t-track-owner textarea[name='newComment']");
    browser.setValue(".t-track-owner textarea[name='newComment']", comment);
    await browser.click(".t-track-owner .t-comment-submit");
    await browser.waitForElementNotVisible(".t-track-owner .t-spinner");
    await browser.pause(100);
    await assertTextInElements(
      browser,
      ".t-track-owner .t-comment-text",
      comment
    );
    browser.assert.value(".t-track-owner textarea[name='newComment']", "");
  },
};
