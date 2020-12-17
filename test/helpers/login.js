async function login(browser, email, password) {
  await browser.click("#login");
  browser.waitForElementVisible("input[name='username']");
  browser.setValue("input[name='username']", email);
  browser.setValue("input[name='password']", password);
  browser.click("button[type='submit']");
}
module.exports = login;
