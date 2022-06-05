var ColNames = ['time', 'row'];
const MinsInDay = 60*24;
const TriggerMins = 30; 
const MaxEntries = MinsInDay / TriggerMins;


function setColNames(range) {
  range.setValues([ColNames]);
  console.log("Columns named.")
}


function update() {
  updateIteration();
}


function updateIteration() {
  let dataObj = undefined;
  let range = getRowRange(1);
  if (! range.getValue()) {
    dataObj = getOrderbookRow();
    ColNames = Object.keys(dataObj);
    setCurrentRow(2);
    range = getRowRange(1);
    setColNames(range);
    let n = SpreadsheetApp.getActiveSpreadsheet().getNumSheets()
                      .toString().padStart(4, '0');
    let sheet = getLastSheet().setName(`d{n}`);
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
  let d = (dataObj ? dataObj : getOrderbookRow());
  let vals = [Object.values(d)];
  ColNames = Object.keys(d);
  let range = getRowRange(n);
  range.setValues(vals);
  range.getSheet().autoResizeColumns(1, ColNames.length);
  
  console.log(`Row ${n} updated.`);

  setCurrentRow(n+1);
}
