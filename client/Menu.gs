function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Settings')
      .addItem('Set symbol', 'showPrompt')
      .addToUi();
}


function showPrompt(isPosZero=false) {
  var ui = SpreadsheetApp.getUi(); // Same variations.
  let msg0 = '';
  let msg1 = 'Please enter a market symbol:';
  if (!getSymbol()) {
    msg0 = 'The position number is not set.';
  } else if (isPosZero) {
    msg0 = `Symbol ${getSymbol()} is empty.`;
  } else {
    msg0 = `Your position number is ${getSymbol()}`;
    msg1 = 'Do you want to enter a new one?'
  }
  var result = ui.prompt(
      msg0,
      msg1,
      ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    // User clicked "OK".
    setSymbol(Number(text));
    ui.alert('Your Symbol is ' + getSymbol() + '.');
  } else if (button == ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert('Symbol unchanged.');
  };
}


function doSomething() {
  Logger.log('doSomething is called!~!');
  var scriptProperties = PropertiesService.getScriptProperties();
  var b = scriptProperties.getProperties();
  Logger.log(b);
  if (Object.keys(b).length==0) {Logger.log('Nothing')};
}
