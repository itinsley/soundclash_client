require('dotenv').config();
const BASE_URL = process.env.BASE_URL || 'https://soundclash.test:3000/';
const OWNER='api_owner@soundcla.sh';
const OPPONENT='api_opponent@soundcla.sh';
const SPECTATOR='api_spectator@soundcla.sh';

async function login(browser, email, password){
  await browser.url(BASE_URL)
  await browser.click("#login")
  browser.setValue("input[name='email']", email)
  browser.setValue("input[name='password']", password)
  return browser.click("button[type='submit']")
}


async function clickElement(browser, elements, innerText){
  for (var i=0; i<elements.length; i++){
    const elementId = elements[i].ELEMENT;
    const res = await browser.elementIdAttribute(elementId, 'innerText');
    const elementInnerText = res.value;
    if (elementInnerText===innerText){
      browser.elementIdClick(elementId)
      break;
    }
  }
}

async function clickElementBySelector(browser, cssSelector, innerText){
  const result = await browser.elements('css selector', cssSelector);
  const elements = result.value;
  return clickElement(browser,elements, innerText);
}

module.exports = {

  'View Clash:: - spectator, not logged in' : async function (browser) {
    await browser.url(BASE_URL)
    browser.waitForElementVisible('.card');
    browser.verify.containsText('h1', 'Recent Clashes');
    await clickElementBySelector(browser, '.t-card-title', 'API::awaiting_owner');
    browser.verify.containsText('h1', 'API::awaiting_owner')

    // My Clashes:: - spectator, not logged in
    browser.click('.navbar-brand')
      .waitForElementVisible('.card')
      .verify.elementNotPresent(".t-myclashes-header")
      .end()
  },

  'My Clashes:: logged in as clash owner' : async function (browser) {
    // With status of challenge_sent
    await login(browser, OWNER, 'password')
    browser.verify.containsText('.clash-tile', 'Api Owner vs. Api Opponent')
    await clickElementBySelector(browser, '.t-myclashes-container .t-card-title', 'API::challenge_sent');
    browser.waitForElementVisible('.t-clash-status');
    browser.verify.containsText('.t-clash-status', 'we are waiting for Api Opponent')

    // With status of awaiting_owner
    browser.click('.navbar-brand')
    browser.waitForElementVisible('.t-myclashes-container');
    browser.verify.containsText('h1', 'My Clashes');
    browser.waitForElementVisible('.t-card-title');
    await clickElementBySelector(browser, '.t-myclashes-container .t-card-title', 'API::awaiting_owner');
    browser.waitForElementVisible('.t-clash-status');
    browser.verify.containsText('.t-clash-status', 'Api Opponent just played')
    browser.verify.containsText('.t-clash-status', "Now it's your turn...")
    browser.end();
  },

  'My Clashes:: logged in as clash opponent' : async function (browser) {
    // Clash with status of awaiting_owner
    await login(browser, OPPONENT, 'password')
    browser.waitForElementVisible('.t-myclashes-container');
    browser.verify.containsText('h1', 'My Clashes');
    browser.waitForElementVisible('.t-card-title');
    await clickElementBySelector(browser, '.t-myclashes-container .t-card-title', 'API::awaiting_owner');
    browser.waitForElementVisible('.t-clash-header')
    browser.verify.elementPresent('iframe')
    browser.verify.containsText('.t-clash-status', 'we are waiting for Api Owner')

    // Clash with status of awaiting_opponent
    browser.click('.navbar-brand')
    await clickElementBySelector(browser, '.t-myclashes-container .t-card-title', 'API::awaiting_opponent');
    browser.waitForElementVisible('.t-clash-header')
    browser.waitForElementVisible('iframe')
    browser.verify.containsText('.t-clash-status', "Now it's your turn")
    browser.setValue("input[name='youTubeUrl']", 'https://www.youtube.com/watch?v=-KIm0Je4phY')
    browser.setValue("textarea[name='commentText']", "Owner's revenge")
    browser.waitForElementVisible('.t-track-title')
    // Youtube integration, depends on track existing..
    browser.verify.containsText('.t-track-title', 'Friends by Amii Stewart (12 in version - VERY CLEAR)')
    // Don't commit as this will break the tests next time.

    // Clash with status of challenge_sent
    browser.click('.navbar-brand')
    browser.verify.containsText('.clash-tile', 'Api Owner vs. Api Opponent')
    await clickElementBySelector(browser, '.t-myclashes-container .t-card-title', 'API::challenge_sent');
    browser.waitForElementVisible('.t-clash-header')
    browser.verify.elementPresent('iframe')
    browser.verify.containsText('.t-track-opponent-container', 'Waiting for you')
    browser.verify.containsText('.t-track-opponent-container', 'You have been challenged to a soundclash by Api Owner')
    browser.end()
  },

  'My Clashes:: challenge_sent - logged in spectator' : async function (browser) {
    await login(browser, SPECTATOR, 'password')
    browser.verify.elementNotPresent(".t-myclashes-header .clash-tile")
    browser.end()
  },

};