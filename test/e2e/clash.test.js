const { BASE_URL } = require("../helpers/constants");

module.exports = {
  "Clash Header: Check meta tags": async function (browser) {
    await browser.url(BASE_URL);
    browser.waitForElementVisible(".card");
    await browser.click("partial link text", "API::with_history");
    browser.verify
      .attributeEquals(
        "meta[name='description']",
        "content",
        "Api Owner and Api Opponent laying down tracks in a Soundclash:: API::with_history. 6 tracks played so far.."
      )
      .verify.attributeEquals(
        "meta[property='og:title']",
        "content",
        "Soundclash:: API::with_history"
      )
      .verify.attributeEquals(
        "meta[property='og:image']",
        "content",
        "https://res.cloudinary.com/soundclash/image/youtube/c_fill_pad,g_auto,h_200,w_267/imTDWIZwEDU"
      );
  },
};
