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

    //Dynmamic Round loading
    await browser.url(BASE_URL);
    browser.waitForElementVisible(".card");
    await browser.click("partial link text", "API::with_history");
    browser.verify.containsText("h1", "API::with_history");
    await browser.click("partial link text", "ROUND 2");
    browser.assert.containsText(".t-row-detail-2 h2", "With History:: Track 1");
  },
};
