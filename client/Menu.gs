function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Settings')
      .addItem('Set Symbol', 'showPrompt')
      .addToUi();
}


function showPrompt() {
  var ui = SpreadsheetApp.getUi(); // Same variations.
  let msg0 = '';
  let msg1 = 'Please enter a market symbol:';
  if (!getSymbol()) {
    msg0 = 'The Symbol is not set.';
  } else {
    msg0 = `Your Symbol is ${getSymbol()}`;
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
    setSymbol(text);
    ui.alert('Your Symbol is ' + getSymbol() + '.');
  } else if (button == ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert('Symbol unchanged.');
  };
}


function doSomething() {
  Logger.log('doSomething is called!~!');
  var scriptProperties = PropertiesService.getDocumentProperties();
  var b = scriptProperties.getProperties();
  Logger.log(b);
  if (Object.keys(b).length==0) {Logger.log('Nothing')};
  Logger.log(getSymbol());
}
