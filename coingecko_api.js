

// GET PRICE
var CallApiPrice = async(currency, crypto) => {
    let data = await CoinGeckoClient.simple.price({
        ids: [crypto],
        vs_currencies: [currency],
    });
    return data.data.bitcoin.usd
};


