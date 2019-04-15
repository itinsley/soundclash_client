const OWNER='api_owner@soundcla.sh';
const OPPONENT='api_opponent@soundcla.sh';

module.exports = {

  'Home page - Recent Clashes' : function (browser) {
    const page = browser
      .url('https://soundclash.test:3000')
      .waitForElementVisible('body');

    page.verify.containsText('h1', 'Recent Clashes');
    browser.end();
  },

  'My Clashes:: challenge_sent - owner' : function (browser) {
    browser
      .url("https://soundclash.test:3000")
      .waitForElementVisible("body")
      .click("#login")
      .waitForElementVisible('input')
      .setValue("input[name='email']", OWNER)
      .setValue("input[name='password']", "password")
      .click("button[type='submit']")
      .waitForElementVisible(".clash-tile")
      .verify.containsText('.clash-tile', 'Api Owner vs. Api Opponent')

    browser
      .click(".clash-tile")
      .verify.containsText('div', 'hello we are waiting for Api Opponent')
  }

};