async function clickElement(browser, elements, innerText) {
  for (var i = 0; i < elements.length; i++) {
    const elementId = elements[i].ELEMENT;
    const res = await browser.elementIdAttribute(elementId, "innerText");
    const elementInnerText = res.value;
    if (elementInnerText === innerText) {
      browser.elementIdClick(elementId);
      break;
    }
  }
}

async function clickElementBySelector(browser, cssSelector, innerText) {
  const result = await browser.elements("css selector", cssSelector);
  const elements = result.value;
  return clickElement(browser, elements, innerText);
}

module.exports = clickElementBySelector;
