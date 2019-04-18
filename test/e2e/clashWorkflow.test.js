const OWNER='api_owner@soundcla.sh';
const OPPONENT='api_opponent@soundcla.sh';
const SPECTATOR='api_spectator@soundcla.sh';

async function login(browser, email, password){
  await browser.url("https://soundclash.test:3000")
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

  'Home page - Recent Clashes' : function (browser) {
    const page = browser
      .url('https://soundclash.test:3000')
      .waitForElementVisible('body');
    page.verify.containsText('h1', 'Recent Clashes');
    browser.end();
  },

  'View Clash:: - spectator, not logged in' : async function (browser) {
    await browser.url("https://soundclash.test:3000")
    browser.waitForElementVisible('.card');
    await clickElementBySelector(browser, '.t-card-title', 'API::awaiting_owner');
    browser.verify.containsText('h1', 'API::awaiting_owner')
    browser.end()
  },

  'My Clashes:: - spectator, not logged in' : function (browser) {
    browser
      .url("https://soundclash.test:3000")
      .verify.elementNotPresent(".t-myclashes-header")
      .end()
  },

  'My Clashes:: challenge_sent - owner' : async function (browser) {
    await login(browser, OWNER, 'password')
    browser.verify.containsText('.clash-tile', 'Api Owner vs. Api Opponent')
    await clickElementBySelector(browser, '.t-myclashes-container .t-card-title', 'API::challenge_sent');
    browser.verify.containsText('div', 'hello we are waiting for Api Opponent')
    browser.end()
  },

  'My Clashes:: challenge_sent - opponent' : async function (browser) {
    await login(browser, OPPONENT, 'password')
    browser.verify.containsText('.clash-tile', 'Api Owner vs. Api Opponent')
    await browser.click(".clash-tile")
    browser.verify.elementPresent('iframe')
    browser.verify.elementPresent('.t-clash-header')
    browser.verify.containsText('.t-track-opponent-container', 'Waiting for you')
    browser.verify.containsText('.t-track-opponent-container', 'You have been challenged to a soundclash by Api Owner')
    browser.end()
  },

  'My Clashes:: challenge_sent - logged in spectator' : async function (browser) {
    await login(browser, SPECTATOR, 'password')
    browser.verify.elementNotPresent(".t-myclashes-header .clash-tile")
    browser.end()
  },

  'My Clashes:: awaiting_owner - owner' : async function (browser) {
    await login(browser, OWNER, 'password')
    browser.verify.containsText('h1', 'My Clashes');
    await clickElementBySelector(browser, '.t-myclashes-container .t-card-title', 'API::awaiting_owner');
    browser.verify.containsText('div', 'hello we are waiting for Api Owner')
    browser.end();
  },

  'My Clashes:: awaiting_owner - opponent' : async function (browser) {
    await login(browser, OPPONENT, 'password')
    browser.verify.containsText('h1', 'My Clashes');
    await clickElementBySelector(browser, '.t-myclashes-container .t-card-title', 'API::awaiting_owner');
    browser.pause
    browser.verify.elementPresent('iframe')
    browser.verify.elementPresent('.t-clash-header')
    browser.verify.containsText('div', 'hello we are waiting for Api Owner')
    browser.end()
  },

};