function getRawOrderbook(exchange, symbol, divider=1000.0, baseurl=BASEURL) {
  let url = `${baseurl}?exchange=${exchange}&symbol=${symbol}&divider=${divider}`
  let res = UrlFetchApp.fetch(url);
  let rc = JSON.parse(res.getContentText());
  
  return rc;
}

function getSortedOrderbook(exchange, symbol, levels=10, divider=1000.0, baseurl=BASEURL) {
  let b = getRawOrderbook(exchange, symbol, divider, baseurl);
}

// TODO: get doc properties as function input
