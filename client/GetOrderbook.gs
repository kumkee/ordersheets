class OrderSheets {
  constructor(exchange, symbol, depth, divider=1000.0, baseurl=BASEURL) {
    this.exchange = exchange;
    this.symbol = symbol;
    this.depth = depth;
    this.divider = divider;
    this.baseurl = baseurl;
  }
}


function getOrderbook(exchange, symbol, divider=1000.0, baseurl=BASEURL) {
  let url = `${baseurl}?exchange=${exchange}&symbol=${symbol}&divider=${divider}`
  let res = UrlFetchApp.fetch(url);
  let rc = JSON.parse(res.getContentText());
  
  return rc;
}
