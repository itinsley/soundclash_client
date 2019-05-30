async function login(browser, email, password){
  await browser.click("#login")
  browser.setValue("input[name='email']", email)
  browser.setValue("input[name='password']", password)
  browser.click("button.t-login[type='submit']")
  browser.pause(1000)
}
 module.exports = login;