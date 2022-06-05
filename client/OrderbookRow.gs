class OrderbookRow {
  constructor(exchange, symbol, depth, divider=1000.0, baseurl=BASEURL) {
    this.exchange = exchange;
    this.symbol = symbol;
    this.depth = depth;
    this.divider = divider;
    this.baseurl = baseurl;

    this.initOrderbook();
    this.makeTable();
  }

  initOrderbook() {
    this.rawOrderbook = getOrderbook(this.exchange, this.symbol, this.divider, this.baseurl);
    this.bids = this.rawOrderbook['bids'].sort((a,b)=>a[0]-b[0]).slice(-this.depth);
    this.asks = this.rawOrderbook['asks'].sort((a,b)=>a[0]-b[0]).slice(0, this.depth);
    this.step = this.rawOrderbook['step'];
    this.time = this.rawOrderbook['datetime'];
  }

  makeTable() {
    this.table = {
      time: [this.time],
      step: [this.step, 'number'],
      midPrice: [(this.bids[this.depth-1][0] + this.asks[0][0])/2.0, 'number']
    };
    const places = String(this.depth).length;
    for (const k of ['bid', 'ask']) {
      for (let i=0; i<this.depth; i++) {
        let j = (k=='ask' ? i : this.depth-1-i);
        this.table[k + String(j).padStart(places, '0')] = [this[k + 's'][i][1], 'number'];
      }
    }
  }
}


function getOrderbook(exchange, symbol, divider=1000.0, baseurl=BASEURL) {
  let url = `${baseurl}?exchange=${exchange}&symbol=${symbol}&divider=${divider}`
  let res = UrlFetchApp.fetch(url);
  let rc = JSON.parse(res.getContentText());
  
  return rc;
}
