const login = require("../helpers/login");
const { BASE_URL, OWNER, PASSWORD } = require("../helpers/constants");

module.exports = {
  "Logged in Sanity Test:: - Check various components": async function (
    browser
  ) {
    // User details
    await browser.url(BASE_URL);
    await login(browser, OWNER, PASSWORD);
    await browser.click("#userDetails");
    browser.waitForElementVisible(".t-user-detail-heading");
    browser.assert.containsText(".t-user-detail-heading", "Hi Api Owner");
  },
};
