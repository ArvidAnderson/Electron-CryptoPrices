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
            <h4>${name}</h4><h5>${result}</h5>
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

//Catch add crypto - On add
ipcRenderer.on('crypto:add', function(e, crypto){
    ul.className = 'no-collection-border collection';
    const li = document.createElement('li');
    li.className = 'custom-li collection-item';
    //Adding the price using the API from crypto_api_js
    callAPI('USD', crypto).then(result => {
        li.innerHTML = (`
        <div class='row crypto-in-watchlist'>
            <div class="col s6">
                <h4>${crypto_names(crypto)}</h4><h5>$${result}</h5>
            </div>
            <div class="col s6">
                <img class="right" src="assets/cryptoicons/white/${crypto}.png" alt="">
            </div> 
        </div>`);
        appendtoDatabase(crypto_names(crypto), crypto);
    });
    ul.appendChild(li);
});

//Clear watchlist
ipcRenderer.on('watchlist:clear', function(){
    store.clear();
    ul.innerHTML = '';
    if(ul.children.length == 0){
        ul.className = '';
    }
});

//Watchlist Reload prices
ipcRenderer.on('watchlist:reload', function(){
    print("GG")
});