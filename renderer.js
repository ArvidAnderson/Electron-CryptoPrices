//Importing neccesary modules for the database
const Store = require('electron-store');
const store = new Store();

console.log(store.get());

// Rendering on launch - Also looping though the database to gather the information to render
database_object = store.get();
for (const i in database_object) {
    ul.className = 'no-collection-border collection';
    const li = document.createElement('li');
    li.className = 'custom-li collection-item';
    li.innerHTML = `
    <div class='row crypto-in-watchlist'>
        <div class="col s6">
            <h4 class='crypto-name'>${i}</h4><h5 class="crypto-price">${store.get('eth.price')}</h5>
        </div>
        <div class="col s6">
            <img class="right" src="assets/cryptoicons/white/${store.get('eth.img')}.png" alt="">
        </div> 
    </div>`
    console.log(`${i}`);
    ul.appendChild(li);
}

//Add to database
function appendtoDatabase(crypto_name, crypto, result) {
    store.set(crypto, {name: crypto_name, img: crypto, price: result
    });
}


//Clear whole config gets started from mainWindow.html
function cleardatabase() {
    store.clear();
}