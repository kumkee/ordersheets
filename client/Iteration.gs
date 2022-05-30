const CR_KEY = 'CURRENT_ROW';
const PN_KEY = 'POSITION_NUMBER';
const QS_KEY = 'QUERY_STRING';
var ColNames = ['time', 'row'];
const MinsInDay = 60*24;
const TriggerMins = 30; 
const MaxEntries = MinsInDay / TriggerMins;


function update() {
  updateIteration();
}


function updateIteration() {
  let dataObj = undefined;
  let range = getRowRange(1);
  if (! range.getValue()) {
    dataObj = getOnChainData(getPosNumber());
    ColNames = Object.keys(dataObj);
    setCurrentRow(2);
    range = getRowRange(1);
    setColNames(range);
    let n = SpreadsheetApp.getActiveSpreadsheet().getNumSheets();
    let sheet = getLastSheet().setName(`Day ${n}`);
    sheet.setFrozenColumns(1);
    sheet.setFrozenRows(1);
  }
  updateStep(dataObj);
}


function getLastSheet(ifInsert=false) {
  let spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  if (ifInsert) {
    spreadSheet.insertSheet();
    spreadSheet.moveActiveSheet(1); // (spreadSheet.getNumSheets());
  }
  let sheets = spreadSheet.getSheets();
  return sheets[0]; // [sheets.length-1];
}


function getSheet() {
  return getLastSheet(getCurrentRow() > MaxEntries+1);
}


function getRowRange(row) {
  let sheet = getSheet();
  let range = sheet.getRange(row, 1, 1, ColNames.length);

  return range;
}


function updateStep(dataObj){
  let n = getCurrentRow();
  let d = (dataObj ? dataObj : getOnChainData(getPosNumber()));
  let vals = [Object.values(d)];
  ColNames = Object.keys(d);
  let range = getRowRange(n);
  range.setValues(vals);
  range.getSheet().autoResizeColumns(1, ColNames.length);
  
  console.log(`Row ${n} updated.`);

  setCurrentRow(n+1);
}


function setColNames(range) {
  range.setValues([ColNames]);
  console.log("Columns named.")
}


function setCurrentRow(n) {
  _setDocProperty(CR_KEY, n, arguments.callee.name);
}


function setPosNumber(n) {
  _setDocProperty(PN_KEY, n, arguments.callee.name);
}


function setQueryString(s) {
  _setDocProperty(QS_KEY, s, arguments.callee.name, ifString=true);
}


function _setDocProperty(propKey, n, callerName, ifString=false) {
  let documnetProperties = PropertiesService.getDocumentProperties();
  if(!ifString) {
    if (n>0 && Number.isInteger(n)) {
      documnetProperties.setProperty(propKey, n.toString());
      console.log(`${propKey} set to ${n}`)
    }
    else {
      console.error(`${callerName}: n must be a postive interger`);
    }
  } else {
    documnetProperties.setProperty(propKey, n);
    console.log(`${propKey} set to ${n}`)
  }

}


function getCurrentRow() {
  return _getDocProperty(CR_KEY);
}


function getPosNumber() {
  return _getDocProperty(PN_KEY);
}


function getQueryString() {
  return _getDocProperty(QS_KEY, ifString=true);
}


function _getDocProperty(propKey, ifString=false) {
  let documnetProperties = PropertiesService.getDocumentProperties();
  if (ifString) {
    return documnetProperties.getProperty(propKey);
  } else {
    return Number(documnetProperties.getProperty(propKey));
  }
}
