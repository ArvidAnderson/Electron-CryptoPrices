const Store = require('electron-store');
const store = new Store();

console.log(store.get());

for (const property in store.get()) {
    console.log(`${property}`);
  }

//Catch add crypto
ul.className = 'no-collection-border collection';
const li = document.createElement('li');
li.className = 'custom-li collection-item';
li.innerHTML = `
<div class='row crypto-in-watchlist'>
    <div class="col s6">
        <h4 class='crypto-name'>${store.get('eth.name')}</h4><h5 class="crypto-price">${store.get('eth.price')}</h5>
    </div>
    <div class="col s6">
        <img class="right" src="assets/cryptoicons/white/${store.get('eth.img')}.png" alt="">
    </div> 
</div>`
ul.appendChild(li);


//Add to database
function appendtoDatabase(crypto_name, crypto, result) {
    store.set(crypto, {name: crypto_name, img: crypto, price: result
    });
}


//Clear whole config gets started from mainWindow.html
function cleardatabase() {
    store.clear();
}