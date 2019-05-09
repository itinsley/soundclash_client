const login = require("../helpers/login");
const {BASE_URL, OWNER} = require("../helpers/constants");
const clickElementBySelector = require("../helpers/clickElementBySelector");
const assertTextInElements = require("../helpers/assertTextInElements");

module.exports = {

  'Comments:: - I can add a comment' : async function (browser) {
    const comment = `A comment ts: ${Date.now()}`
    await browser.url(BASE_URL)
    await login(browser, OWNER, "password")
    browser.waitForElementVisible('.card');
    await clickElementBySelector(browser, '.t-card-title', 'API::awaiting_owner');
    browser.waitForElementVisible(".t-track-owner textarea[name='newComment']");
    browser.setValue(".t-track-owner textarea[name='newComment']", comment)
    await browser.click(".t-track-owner .t-comment-submit")
    await browser.waitForElementNotVisible('.t-track-owner button.t-spinner')
    await assertTextInElements(browser, '.t-track-owner .t-comment-text', comment);
    browser.assert.value(".t-track-owner textarea[name='newComment']", "");
  },
}