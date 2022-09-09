const express = require("express");
const app = express();
const mysql = require("mysql");
const _ = require("lodash");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")(/*options*/);
const cn = "postgres://edixg:edixg21@localhost:5432/abitrage";
const db = pgp(cn);
const axios = require("axios");
const path = require("path");
// const coinService = require("./services/get_coin_services");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
//test
const server = app.listen(3200, () => {});
var bitkub = [];
var coinbase = [];
var binance = [];
var liquid = [];
var tokocrypto = [];
var coinflex = [];
var thbprice = 0;
var globalcoin = [];
var kkk = {};

var data = "";

setInterval(() => {
  getname();
}, 60000);

async function getname() {
  bitkub = [];
  coinbase = [];
  binance = [];
  liquid = [];
  tokocrypto = [];
  coinflex = [];
  thbprice = 0;
  globalcoin = [];
  var config = {
    method: "get",
    url: "https://www.bitkub.com/api/market/market-prices-with-out-login",
    headers: {
      Cookie:
        "__cf_bm=BzA_PtfQOpZPqKMAo8MlViXp4KKCfwjJHYPFvtB7V7M-1661667191-0-Acm9R6axRUgIDJluswZNXBNEPYHut0dw72XafiJzQeepPHUFWlkNmdREB69Q+83AGvsMkEAjQBcBFmmw6wIHNUQ=",
    },
    data: data,
  };
  await axios(config)
    .then(function (response) {
      for (let index = 0; index < response.data.data.length; index++) {
        bitkub.push({
          webname: "bitkub",
          name: response.data.data[index].currency,
          price: response.data.data[index].last_price,
          vol: response.data.data[index].volume,
          percen: response.data.data[index].percentage,
        });
      }
      // console.log("bitkub",bitkub)
    })
    .catch(function (error) {
      console.log(error);
    });

  var config = {
    method: "get",
    url: "https://www.coinbase.com/api/v2/assets/search?base=USD&country=TH&filter=all&include_prices=true&limit=7&order=asc&page=1&query=&resolution=day&sort=rank",
    headers: {
      Cookie:
        "__cf_bm=uUUDaIIqEfAGfW_q5KPw2nnhP33BhR3tehcjNbdwKR8-1661667913-0-AfVPP3W54aFKLN4Ux0ihcAcrKSoJUrEzKH/xlYO5sBCtxA5lQgJrtF8aZNUoWjulHsNxFsEifI4KVaD8C/hAaRg=; cb_dm=84507448-272d-4b42-8233-0e8ba9549650",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      for (let i = 0; i < response.data.data.length; i++) {
        coinbase.push({
          webname: "coinbase",
          name: response.data.data[i].symbol,
          price: response.data.data[i].latest,
          vol: response.data.data[i].volume_24h,
          percen: response.data.data[i].percent_change,
        });
      }
      // console.log("coinbase",coinbase)
    })

    .catch(function (error) {
      console.log(error);
    });

  var config = {
    method: "get",
    url: "https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list",
    headers: {},
    data: data,
  };

  await axios(config)
    .then(function (response) {
      for (let i = 0; i < response.data.data.length; i++) {
        binance.push({
          webname: "binance",
          name: response.data.data[i].name,
          price: response.data.data[i].price,
          vol: response.data.data[i].volume,
          percen: response.data.data[i].dayChange,
        });
      }
      // console.log("binance",binance)
    })
    .catch(function (error) {
      console.log(error);
    });

  var config = {
    method: "get",
    url: "https://api.liquid.com/currencies?with_rate=true&resolution=300&rate_type=mid",
    headers: {
      Cookie:
        "AWSALB=cx6r0Tsy6egMHlHSZrkU+OVRchfVV71RqcrOixWM/nU9vM808B3CkvURa8zrbgz/RXk3fK6KNa5Z30+qswSSt+YYe61b2KyeGYjxIcHyJ7XbU6RCdKVJJIJNGi57; AWSALBCORS=cx6r0Tsy6egMHlHSZrkU+OVRchfVV71RqcrOixWM/nU9vM808B3CkvURa8zrbgz/RXk3fK6KNa5Z30+qswSSt+YYe61b2KyeGYjxIcHyJ7XbU6RCdKVJJIJNGi57",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        liquid.push({
          webname: "liquid",
          name: response.data[i].currency,
          price: response.data[i].exchange_rate,
          vol: null,
          percen: null,
        });
      }
      // console.log("liquid",liquid)
    })
    .catch(function (error) {
      console.log(error);
    });

  var config = {
    method: "get",
    url: "https://www.tokocrypto.com/v1/market/trading-pairs?quoteAsset=USDT&offset=0&limit=1000",
    headers: {},
    data: data,
  };

  await axios(config)
    .then(function (response) {
      for (let i = 0; i < response.data.data.list.length; i++) {
        tokocrypto.push({
          webname: "tokocrypto",
          name: response.data.data.list[i].baseAsset,
          price: response.data.data.list[i].price,
          vol: response.data.data.list[i].volume,
          percen: response.data.data.list[i].change24h,
        });
      }
      // console.log("tokocrypto",tokocrypto);
    })
    .catch(function (error) {
      console.log(error);
    });

  var config = {
    method: "get",
    url: "https://v2api.coinflex.com/v2/ohlc/public/perp/ticker",
    headers: {},
    data: data,
  };

  await axios(config)
    .then(function (response) {
      for (let i = 0; i < response.data.data.length; i++) {
        coinflex.push({
          webname: "coinflex",
          name: response.data.data[i].contractValCurrency,
          price: response.data.data[i].marketPrice,
          vol: response.data.data[i].volume,
          percen: null,
        });
      }
      // console.log(coinflex);
    })
    .catch(function (error) {
      console.log(error);
    });

  findcoin(bitkub, coinbase, binance, liquid, tokocrypto, coinflex);
}

async function findcoin(
  bitkub,
  coinbase,
  binance,
  liquid,
  tokocrypto,
  coinflex
) {
  globalcoin = [];
  var btclist = [
    "BTC",
    "ETH",
    "WAN",
    "XRP",
    "LTC",
    "BCH",
    "USDT",
    "BNB",
    "XLM",
    "SHIB",
  ];
  var config = {
    method: "get",
    url: "https://api.exchangerate-api.com/v4/latest/USD",
    headers: {},
    data: data,
  };

  axios(config)
    .then(function (response) {
      thbprice = response.data.rates.THB;

      for (var i = 0; i < btclist.length; i++) {
        bitkub.find(function (value) {
          if (value.name == btclist[i]) {
            value.price = parseInt(value.price) / thbprice;
            globalcoin = [];
            globalcoin.push(value);
          }
        });
      }
      // console.log("globalcoin", globalcoin);
    })
    .catch(function (error) {
      console.log(error);
    });

  for (var i = 0; i < btclist.length; i++) {
    coinbase.find(function (value) {
      if (value.name == btclist[i]) {
        globalcoin.push(value);
      }
    });
  }

  for (var i = 0; i < btclist.length; i++) {
    binance.find(function (value) {
      if (value.name == btclist[i]) {
        globalcoin.push(value);
      }
    });
  }

  for (var i = 0; i < btclist.length; i++) {
    liquid.find(function (value) {
      if (value.name == btclist[i]) {
        globalcoin.push(value);
      }
    });
  }

  for (var i = 0; i < btclist.length; i++) {
    tokocrypto.find(function (value) {
      if (value.name == btclist[i]) {
        globalcoin.push(value);
      }
    });
  }
  for (var i = 0; i < btclist.length; i++) {
    coinflex.find(function (value) {
      if (value.name == btclist[i]) {
        globalcoin.push(value);
      }
    });
  }
  // console.log(globalcoin.length);

  db.any(`update compare_coin set currentflag = 0 where currentflag = 1 `)
    .then(() => {
      for (let i = 0; i < globalcoin.length; i++) {
        if (globalcoin[i].name != null) {
          db.any(
            `insert into compare_coin (coinname,price,vol,percen,webname,currentflag,insertdate) 
              values($1,$2,$3,$4,$5,$6,$7)`,
            [
              globalcoin[i].name,
              globalcoin[i].price,
              globalcoin[i].vol,
              globalcoin[i].percen,
              globalcoin[i].webname,
              1,
              new Date().getTime(),
            ]
          )
            .then(() => {
              // console.log("insert success");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
      // console.log("globalcoin.length", globalcoin.length);
    })
    .catch((error) => {
      console.log(error);
    });
}

setInterval(() => {
  deleterow7days()
}, 7 * 24 * 3600 * 1000);

function deleterow7days() {
  db.any(
    `DELETE from compare_coin where currentflag = 0 and insertdate > '7 day'`
  )
}

app.post("/api/getcoinname", (req, res) => {
  db.any(` SELECT * FROM compare_coin where currentflag = 1`)
    .then((data) => {
      return res.status(200).json({
        MESSAGE: "success",
        ms: "good",
        CODE: "200",
        result: data && data[0] ? data : [],
      });
    })
    .catch((error) => {
      console.log("error ", error);
      return res.status(500).json({
        MESSAGE: "system error",
        CODE: "500",
      });
    });
});

app.post("/api/getcoinbyname", (req, res) => {
  var coinname = _.get(req, ["body", "coinname"]);
  db.any(
    `SELECT * from compare_coin where currentflag = 1 AND coinname = $1
    order by compare_coin.price asc ;`,
    [coinname]
  )

    .then((data) => {
      return res.status(200).json({
        MESSAGE: "success",
        ms: "good",
        CODE: "200",
        result: data && data[0] ? data : [],
      });
    })
    .catch((error) => {
      console.log("error ", error);
      return res.status(500).json({
        MESSAGE: "system error",
        CODE: "500",
      });
    });
});

app.post("/api/insertcoinprice", (req, res) => {
  var coinname = _.get(req, ["body", "coinname"]);
  var price = _.get(req, ["body", "price"]);
  var vol = _.get(req, ["body", "vol"]);
  var percen = _.get(req, ["body", "percen"]);
  var webname = _.get(req, ["body", "webname"]);

  if (coinname <= 0) {
    return res.status(200).json({
      ms: "bad",
      MESSAGE: "Add coin fail",
      CODE: "400",
    });
  }

  if (coinname != null) {
    db.any(
      ` insert into compare_coin (coinname, price, vol, percen, webname ) values ($1,$2,$3,$4,$5) `,
      [coinname, price, vol, percen, webname]
    )
      .then((data) => {
        return res.status(200).json({
          ms: "good",
          MESSAGE: "success",
          CODE: "200",
        });
      })
      .catch((error) => {
        console.log("error => ", error);
        return res.status(200).json({
          ms: "bad",
          MESSAGE: "system error",
          CODE: "500",
        });
      });
  } else {
    return res.status(200).json({
      ms: "bad",
      MESSAGE: "Email incorrect",
      CODE: "400",
    });
  }
});

app.post("/api/updatecoinprice", (req, res) => {
  var coinname = _.get(req, ["body", "coinname"]);
  var price = _.get(req, ["body", "price"]);
  var vol = _.get(req, ["body", "vol"]);
  var percen = _.get(req, ["body", "percen"]);
  var webname = _.get(req, ["body", "webname"]);

  if (coinname <= 0) {
    return res.status(200).json({
      ms: "bad",
      MESSAGE: "Add coin fail",
      CODE: "400",
    });
  }

  if (coinname != null) {
    db.any(
      ` update compare_coin set price = $1 , vol = $2 , percen = $3 where coinname = $4 and webname = $5  `,
      [price, vol, percen, coinname, webname]
    )
      .then((data) => {
        return res.status(200).json({
          ms: "good",
          MESSAGE: "success",
          CODE: "200",
        });
      })
      .catch((error) => {
        console.log("error => ", error);
        return res.status(200).json({
          ms: "bad",
          MESSAGE: "system error",
          CODE: "500",
        });
      });
  } else {
    return res.status(200).json({
      ms: "bad",
      MESSAGE: "Email incorrect",
      CODE: "400",
    });
  }
});

app.get("/api/stop_nodejs", (req, resp) => {
  console.log("Close Server");
  process.exit();
});

module.exports = app;
