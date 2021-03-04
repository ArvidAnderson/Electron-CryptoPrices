// Crypto Selector + Crypto Functions

function crypto_names(crypto) {
    switch(crypto) {
        case 'btc':
            return 'Bitcoin'
        case 'eth':
            return 'Ethereum'
        case 'xrp':
            return 'Ripple'
        case 'bch':
            return 'Bitcoin Cash'
        case 'ada':
            return 'Cardano'
        case 'ltc':
            return 'Lightcoin'
        case 'xlm':
            return 'Stellar Lumens'
    }
}
