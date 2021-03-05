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
            <h4>${name}</h4><h5>$${result}</h5>
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
ipcRenderer.on('crypto:add', function(e, crypto, crypto_name){
    if (crypto in store.get()) {
        console.log("Alredy in list")
        function yesWindow(){
            ipcRenderer.send('alertWindow:open');
        };
        yesWindow();
    } else {
        ul.className = 'no-collection-border collection';
        const li = document.createElement('li');
        li.className = 'custom-li collection-item';
        //Adding the price using the API from crypto_api_js
        callAPI('USD', crypto).then(result => {
            li.innerHTML = (`
            <div class='row crypto-in-watchlist'>
                <div class="col s6">
                    <h4>${crypto_name}</h4><h5>$${result}</h5>
                </div>
                <div class="col s6">
                    <img class="right" src="assets/cryptoicons/white/${crypto}.png" alt="">
                </div> 
            </div>`);
            appendtoDatabase(crypto_name, crypto);
        });
        ul.appendChild(li);
    }
});

//Clear watchlist
ipcRenderer.on('watchlist:clear', function(){
    //Clears the database
    store.clear();
    ul.innerHTML = '';
});


//Reloading the watchlist
ipcRenderer.on('watchlist:reload', function(){
    console.log('Refreshing!')
    ul.innerHTML = '';
    database_object_refresh = store.get();
    for (const i in database_object_refresh) {
        const name = store.get(`${i}.name`)
        const price = store.get(`${i}.price`)
        ul.className = 'no-collection-border collection';
        const li = document.createElement('li');
        li.className = 'custom-li collection-item';
        callAPI('USD', i).then(result => {
        li.innerHTML = `
        <div class='row crypto-in-watchlist'>
            <div class="col s6">
                <h4>${name}</h4><h5>$${result}</h5>
            </div>
            <div class="col s6">
                <img class="right" src="assets/cryptoicons/white/${i}.png" alt="">
            </div> 
        </div>`
        })
        ul.appendChild(li);
    };
});

//Use this later to remove li (crypto) from the ul  remove(this)
function remove(elem){
    elem.parentNode.removeChild(elem);
}