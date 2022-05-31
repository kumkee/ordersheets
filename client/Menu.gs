function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Settings')
      .addItem('Set Symbol', 'showPrompt')
      .addToUi();
}


function showPrompt(key=SB_KEY) {
  var ui = SpreadsheetApp.getUi(); // Same variations.
  let msg0 = '';
  let msg1 = 'Please enter a symbol:';
  if (!_getDocProperty(key, 1)) {
    msg0 = `The ${key} is not set.`;
  } else {
    msg0 = `Your ${key} is ${_getDocProperty(key, 1)}`;
    msg1 = 'Do you want to enter a new one?'
  }
  var result = ui.prompt(
      msg0,
      msg1,
      ui.ButtonSet.OK_CANCEL);

  /* Process the user's response. */
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    // User clicked "OK".
    _setString(text, key);
    ui.alert(`Your ${key} is ${text}.`);
  } else if (button == ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert(`${key} unchanged.`);
  };
}


function doSomething() {
  Logger.log('doSomething is called!~!');
  var scriptProperties = PropertiesService.getDocumentProperties();
  var b = scriptProperties.getProperties();
  Logger.log(b);
  if (Object.keys(b).length==0) {Logger.log('Nothing')};
  Logger.log(_getDocProperty(SB_KEY, 1));
}
