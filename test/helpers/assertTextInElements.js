const assert = require("assert");

async function assertTextInElements(browser, cssSelector, innerText){
  //This is a very slow function for some reason
  const result = await browser.elements('css selector', cssSelector);
  const elements = result.value;

  for (var i=0; i<elements.length-1; i++){
    const elementId = elements[i].ELEMENT;
    const res = await browser.elementIdAttribute(elementId, 'innerText');
    const elementInnerText = res.value;
    if (elementInnerText===innerText){
      console.log(`Found ${innerText} in ${cssSelector}`)
      return;
    }
  }
  assert.fail(`Could not find ${innerText} in '${cssSelector}'`)
}

module.exports = assertTextInElements;