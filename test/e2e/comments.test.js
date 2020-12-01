const login = require("../helpers/login");
const { BASE_URL, OWNER, PASSWORD } = require("../helpers/constants");

module.exports = {
  "Comments:: - I can add a comment": async function (browser) {
    const comment = `A comment ts: ${Date.now()}`;
    await browser.url(BASE_URL);
    await login(browser, OWNER, PASSWORD);
    browser.waitForElementVisible(".card");
    await browser.click("partial link text", "API::awaiting_owner");
    browser.waitForElementVisible(".t-track-owner textarea[name='newComment']");
    browser.setValue(".t-track-owner textarea[name='newComment']", comment);
    await browser.click(".t-track-owner .t-comment-submit");
    await browser.waitForElementNotPresent(".t-track-owner .t-spinner");
    browser.assert.containsText(".t-track-owner", comment);

    browser.assert.value(".t-track-owner textarea[name='newComment']", "");
  },
};
