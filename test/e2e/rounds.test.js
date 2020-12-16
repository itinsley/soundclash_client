const { BASE_URL } = require("../helpers/constants");

const clashIDFromUrl = (clashUrl) => {
  parts = clashUrl.split("/");
  return parts[parts.length - 1];
};

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
    var clashId;
    browser.url(function (result) {
      clashId = clashIDFromUrl(result.value);
      browser.url(`${BASE_URL}clashes/${clashId}/rounds/2`);
      browser.waitForElementVisible(".t-row-detail-2");
      browser.assert.containsText(
        ".t-row-detail-2 h2",
        "With History:: Track 1"
      );
    });
  },
};
