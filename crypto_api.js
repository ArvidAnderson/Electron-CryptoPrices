//API this uses the crypto-price npm package to retrive information about the cryptocurrencies

let price = require('crypto-price')    
function callAPI(currency, crypto)  { 
return price.getCryptoPrice(currency, crypto).then(obj => { // currency for ex - USD, crypto for ex - ETH
    return obj.price;
}).catch(err => {
    console.log(err)
})
}
