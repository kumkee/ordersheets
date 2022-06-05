class OrderSheets {
  constructor(exchange, symbol, depth, divider=1000.0, baseurl=BASEURL) {
    this.exchange = exchange;
    this.symbol = symbol;
    this.depth = depth;
    this.divider = divider;
    this.baseurl = baseurl;
  }

  initOrderbook() {
    this.rawOrderbook = getOrderbook(this.exchange, this.symbol, this.divider, this.baseurl);
    this.bids = this.rawOrderbook['bids'].sort((a,b)=>a[0]-b[0]).slice(depth);
    this.asks = this.rawOrderbook['asks'].sort((a,b)=>a[0]-b[0]).slice(-depth);
    this.step = this.rawOrderbook['step'];
    this.datetime = this.rawOrderbook['datetime'];
  }
}


function getOrderbook(exchange, symbol, divider=1000.0, baseurl=BASEURL) {
  let url = `${baseurl}?exchange=${exchange}&symbol=${symbol}&divider=${divider}`
  let res = UrlFetchApp.fetch(url);
  let rc = JSON.parse(res.getContentText());
  
  return rc;
}
