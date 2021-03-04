//Importing neccesary modules for the database
const Store = require('electron-store');
const store = new Store();

// Rendering on launch - Also looping though the database to gather the information to render
database_object = store.get();
for (const i in database_object) {
    const name = store.get(`${i}.name`)
    const price = store.get(`${i}.price`)
    ul.className = 'no-collection-border collection';
    const li = document.createElement('li');
    li.className = 'custom-li collection-item';
    callAPI('USD', i).then(result => {
    li.innerHTML = `
    <div class='row crypto-in-watchlist'>
        <div class="col s6">
            <h4 class='crypto-name'>${name}</h4><h5 class="crypto-price">${result}</h5>
        </div>
        <div class="col s6">
            <img class="right" src="assets/cryptoicons/white/${i}.png" alt="">
        </div> 
    </div>`
    })
    ul.appendChild(li);
};



//Add to database
function appendtoDatabase(crypto_name, crypto) {
    store.set(crypto, {name: crypto_name, img: crypto
    });
}


//Clear whole config gets started from mainWindow.html
function cleardatabase() {
    store.clear();
}