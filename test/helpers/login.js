async function login(browser, email, password) {
  await browser.click("#login");
  browser.windowHandles(function (windows) {
    browser.switchWindow(windows.value[1]);
    browser.waitForElementVisible("input[name='username']");
    browser.setValue("input[name='username']", email);
    browser.setValue("input[name='password']", password);
    browser.click("button[type='submit']");
    browser.switchWindow(windows.value[0]);
  });
}
module.exports = login;
