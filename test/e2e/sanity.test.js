const login = require("../helpers/login");
const { BASE_URL, OWNER, PASSWORD } = require("../helpers/constants");

module.exports = {
  "Sanity Test:: - Check various components": async function (browser) {
    // User details
    await browser.url(BASE_URL);
    await login(browser, OWNER, PASSWORD);
    await browser.click("#userDetails");
    browser.waitForElementVisible(".t-user-detail-heading");
    browser.assert.containsText(".t-user-detail-heading", "Hi Api Owner");

    //User Details - Unsubscribe
    const subscriptionStatus = browser.getText(".t-unsubscribed-status");
    browser.assert.ok(subscriptionStatus != "");
    await browser.click("#userDetails");
    browser.assert.ok(
      subscriptionStatus != browser.getText(".t-unsubscribed-status")
    );
  },
};
