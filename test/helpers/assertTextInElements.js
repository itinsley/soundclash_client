const assert = require("assert");

async function assertTextInElements(browser, cssSelector, innerText){
  const result = await browser.elements('css selector', cssSelector);
  const elements = result.value;

  for (var i=elements.length-1; i>0; i--){
    const elementId = elements[i].ELEMENT;
    const res = await browser.elementIdAttribute(elementId, 'innerText');
    const elementInnerText = res.value;
    //Search in reverse, we should find the first..
    console.log(elementInnerText);
    if (elementInnerText===innerText){
      return;
    }
  }
  assert.fail(`Could not find ${innerText} in '${cssSelector}'`)
}

module.exports = assertTextInElements;