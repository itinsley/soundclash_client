async function login(browser, email, password){
  await browser.click("#login")
  browser.setValue("input[name='email']", email)
  browser.setValue("input[name='password']", password)
  return browser.click("button[type='submit']")
}
 module.exports = login;