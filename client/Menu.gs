function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Settings')
      .addItem('Set Symbol', 'showSymbolPrompt')
      .addItem('Set Exchange', 'showExchangePrompt')
      .addItem('Set Depth', 'showDepthPrompt')
      .addToUi();
}

showSymbolPrompt = () => showPrompt(SB_KEY, 1);
showExchangePrompt = () => showPrompt(EX_KEY, 1);
showDepthPrompt = () => showPrompt(DP_KEY, 0);


function showPrompt(key=SB_KEY, isString) {
  var ui = SpreadsheetApp.getUi(); // Same variations.
  let msg0 = '';
  let msg1 = `Please enter a ${key}:`;
  if (!_getDocProperty(key, isString)) {
    msg0 = `The ${key} is not set.`;
  } else {
    msg0 = `Your ${key} is ${_getDocProperty(key, isString)}`;
    msg1 = 'Do you want to enter a new one?'
  }
  var result = ui.prompt(
      msg0,
      msg1,
      ui.ButtonSet.OK_CANCEL);

  /* Process the user's response. */
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (!isString) {text = Number(text);}
  if (button == ui.Button.OK) {
    // User clicked "OK".
    // _setString(text, key);
    _setDocProperty(key, text, "showPrompt", isString)
    ui.alert(`Your ${key} is ${text}.`);
  } else if (button == ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert(`${key} unchanged.`);
  };
}


function doSomething() {
  let b = new  OrderSheets(getExchange(), getSymbol(), getDepth());
  Logger.log(b);
}
