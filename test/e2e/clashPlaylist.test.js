const { BASE_URL } = require("../helpers/constants");

module.exports = {
  "Youtube playlist": async function (browser) {
    await browser.url(BASE_URL);
    browser.waitForElementVisible(".card");
    await browser.click("partial link text", "API::with_history");
    await browser.click("partial link text", "Play all tracks");
    browser.windowHandles(function (windows) {
      browser.switchWindow(windows.value[1]);
      browser.assert.containsText(
        "h4",
        "YouTube playlist. Hit play to listen."
      );
      browser.assert.attributeEquals(
        "iframe",
        "title",
        "Soundclash Playlist:: API::with_history"
      );
    });
  },
};
