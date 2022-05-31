const CR_KEY = 'CURRENT_ROW';
const SB_KEY = 'SYMBOL';
const EX_KEY = 'EXCHANGE';

function _getDocProperty(propKey, isString=false) {
  let documnetProperties = PropertiesService.getDocumentProperties();
  if (isString) {
    return documnetProperties.getProperty(propKey);
  } else {
    return Number(documnetProperties.getProperty(propKey));
  }
}

function _setDocProperty(propKey, n, callerName, isString=false) {
  let documnetProperties = PropertiesService.getDocumentProperties();
  if(!isString) {
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


function setCurrentRow(n) {
  _setDocProperty(CR_KEY, n, arguments.callee.name);
}


function setSymbol(s) {
  _setString(s, SB_KEY);
}

function setExchange(s) {
  _setString(s, EX_KEY);
}

function _setString(s, key) {
  _setDocProperty(key, s, arguments.callee.name, 1);
}


function getCurrentRow() {
  return _getDocProperty(CR_KEY);
}


function getSymbol() {
  return _getDocProperty(SB_KEY, 1);
}

function getExchange() {
  return _getDocProperty(EX_KEY, 1);
}

