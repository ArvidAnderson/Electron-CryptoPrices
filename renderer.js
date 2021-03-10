//Importing neccesary modules for the database
const Store = require('electron-store');
const { watch } = require('original-fs');
const Sortable = require('sortablejs');
const store = new Store();


//Makes sure watchlist_order always is on the top of the database
function watchlist_order_exists() {
    if (store.has('watchlist_order')) {
        console.log('gg')
    } else {
        store.set('watchlist_order', 'empty')
    }    
}

// Rendering on launch - Also looping though the database to gather the information to render, function located below
renderWatchlist();
//Initate the sortable
initiate_sortable();
//Runs watchlist_order_exists
watchlist_order_exists();

//This function grabs information from the database, call it to render
function renderWatchlist() {
    ul.className = 'no-collection-border collection';
    ul.id = 'items';
    database_object = store.get();
    for (const i in database_object) {
        if (i == 'watchlist_order') {
            //Do nothing
        } else {
            const symbol = i;
            const name = store.get(`${i}.name`)
            const li = document.createElement('li');
            li.className = 'custom-li collection-item';
            li.setAttribute('data-id', `${name}`)
            callAPI('USD', symbol).then(result => {
            li.innerHTML = `
            <div class='row crypto-in-watchlist'>
                <div class="col s6">
                    <h4>${name}</h4><h5 class="${symbol}">$${result}</h5>
                </div>
                <div class="col s6">
                    <img class="right" src="assets/cryptoicons/white/${symbol}.png" alt="">
                </div> 
            </div>`
            })
            ul.appendChild(li);
    };  }
}

//Catch add crypto - On add
ipcRenderer.on('crypto:add', function(e, symbol, name){
    if (symbol in store.get()) {
        function yesWindow(){
            ipcRenderer.send('alertWindow:open');
        };
        yesWindow();
    } else {
        ul.className = 'no-collection-border collection';
        const li = document.createElement('li');
        li.className = 'custom-li collection-item';
        li.setAttribute('data-id', `${name}`)
        //Adding the price using the API from crypto_api_js
        callAPI('USD', symbol).then(result => {
            li.innerHTML = (`
            <div class='row crypto-in-watchlist'>
                <div class="col s6">
                    <h4>${name}</h4><h5>$${result}</h5>
                </div>
                <div class="col s6">
                    <img class="right" src="assets/cryptoicons/white/${symbol}.png" alt="">
                </div> 
            </div>`);
            appendtoDatabase(name, symbol);
        });
        ul.prepend(li)
    }
});

//Add to the database
function appendtoDatabase(name, symbol) {
    store.set(symbol, {name: name, img: symbol
    });
}

//Clear the watchlist
ipcRenderer.on('watchlist:clear', function(){
    //Clears the database
    store.clear();
    ul.innerHTML = '';
    watchlist_order_exists();
});

//Reloading the watchlist needs redo
ipcRenderer.on('watchlist:reload', function(){
    console.log('Refreshing')
    database_object = store.get();
    for (const i in database_object) {
        const symbol = i;
        if (i == 'watchlist_order') {
            //Do nothing
        } else {
            callAPI('USD', symbol).then(result => {
                document.getElementsByClassName(`${symbol}`)[0].innerHTML = `$${result}`;
            });
    }};
});

function initiate_sortable() {
    var el = document.getElementById('items');
    var sortable = Sortable.create(el, {
        animation: 600,
        dataIdAttr: 'data-id',
        group: 'watchlist_order',
        store: {
                /**
                 * Get the order of elements. Called once during initialization.
                 * @param   {Sortable}  sortable
                 * @returns {Array}
                 */
                get: function (sortable) {
                    var order = store.get(sortable.options.group.name);
                    return order ? order.split('|') : [];
                },
                /**
                 * Save the order of elements. Called onEnd (when the item is dropped).
                 * @param {Sortable} sortable
                 */
                set: function (sortable) {
                    var order = sortable.toArray();
                    store.set(sortable.options.group.name, order.join('|'));
                }
        }
    });
}
