const OWNER='api_owner@soundcla.sh';
const OPPONENT='api_opponent@soundcla.sh';
const SPECTATOR='api_spectator@soundcla.sh';

function login(browser, email, password){
  browser
    .url("https://soundclash.test:3000")
    .waitForElementVisible("body")
    .click("#login")
    .waitForElementVisible('input')
    .setValue("input[name='email']", email)
    .setValue("input[name='password']", password)
    .click("button[type='submit']")
    .waitForElementVisible(".clash-tile")

    return browser;
}

const ClickInnerText=(browser, innerText)=> (elemResponse)=>{
  elemResponse.value.map(function(element, err) {
    browser.elementIdAttribute(element.ELEMENT, 'innerText', function(res) {
      if (res.value===innerText){
        browser.elementIdClick(element.ELEMENT)
      }
    })
  })
}

module.exports = {

  'Home page - Recent Clashes' : function (browser) {
    const page = browser
      .url('https://soundclash.test:3000')
      .waitForElementVisible('body');

    page.verify.containsText('h1', 'Recent Clashes');
    browser.end();
  },

  'My Clashes:: - spectator, not logged in' : function (browser) {
    browser
      .url("https://soundclash.test:3000")
      .verify.elementNotPresent(".t-myclashes-header")
      .end()
  },

  'My Clashes:: challenge_sent - owner' : async function (browser) {
    login(browser, OWNER, 'password')
      .verify.containsText('.clash-tile', 'Api Owner vs. Api Opponent')
      .elements('css selector', '.t-myclashes-container .t-card-title', 
        ClickInnerText(browser, 'API::challenge_sent')
      )
      .verify.containsText('div', 'hello we are waiting for Api Opponent')
      .end()
  },

  'My Clashes:: challenge_sent - opponent' : function (browser) {
    login(browser, OPPONENT, 'password')
      .verify.containsText('.clash-tile', 'Api Owner vs. Api Opponent')
      .click(".clash-tile")
      .verify.elementPresent('iframe')
      .verify.elementPresent('.t-clash-header')
      .verify.containsText('.t-track-opponent-container', 'Waiting for you')
      .verify.containsText('.t-track-opponent-container', 'You have been challenged to a soundclash by Api Owner')
      .end()
  },

  'My Clashes:: challenge_sent - logged in spectator' : function (browser) {
    login(browser, SPECTATOR, 'password')
      .url("https://soundclash.test:3000")
      .verify.elementNotPresent(".t-myclashes-header .clash-tile")
      .end()
  },

  'My Clashes:: awaiting_owner - owner' : function (browser) {
    login(browser, OWNER, 'password')
      .click(".clash-tile")
      .verify.elementPresent('iframe')
      .verify.elementPresent('.t-clash-header')
      .pause()
      .verify.containsText('.t-track-opponent-container', 'Waiting for Api Opponent')
      .end()

  },

};