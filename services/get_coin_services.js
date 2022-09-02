

async function getBinance() {
    const data= '';
    var config = {
        method: "get",
        url: "https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list",
        headers: {},
        data: data,
      };
    
    const coinData = await axios(config)
    return coinData;
}

module.exports = {
    getBinance: getBinance
}