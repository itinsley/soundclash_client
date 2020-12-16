const { BASE_URL } = require("../helpers/constants");

module.exports = {
  "Dynamic Round loading": async function (browser) {
    await browser.url(BASE_URL);
    browser.waitForElementVisible(".card");
    await browser.click("partial link text", "API::with_history");
    browser.verify.containsText("h1", "API::with_history");
    await browser.click("partial link text", "ROUND 2");
    browser.assert.containsText(".t-row-detail-2 h2", "With History:: Track 1");
  },
  "Round deep linking": async function (browser) {
    const result = await browser.getText(".t-clash-id");
    const clashId = result.value;
    await browser.url(`${BASE_URL}clashes/${clashId}/rounds/2`);
    browser.waitForElementVisible(".t-row-detail-2");
    browser.assert.containsText(".t-row-detail-2 h2", "With History:: Track 1");
  },
};
