const electron = require('electron');
const url = require('url');
const path = require('path');

//Database - -saves to appdata in json file
const Store = require('electron-store');
Store.initRenderer()

//SET ENV : production or sandbox
process.env.NODE_ENV = 'sandbox';

//Initilizing Electron
const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;
let clearWindow;
let alertWindow;
let autoWindow;

// Listen for app to be ready, when the app is ready run function
app.on('ready', function(){
    // Create new main window
    mainWindow = new BrowserWindow({
        title:'GLANCE @ CRYPTO™️',
        frame: false, // Removes the frame
        autoHideMenuBar: true, // Auto hides menu bar for mac os
        minWidth: 400,
        minHeight: 500,
        webPreferences: {
            enableRemoteModule: true, //Need to be enabled for custom navbar to work
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    
    //Loading the html file
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit app when closed
    mainWindow.on('close', function (event) {
        app.quit()
    });

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle create addWindow
function createAddWindow() {
    //Creating new addWindow
    addWindow = new BrowserWindow({
        width: 320,
        height: 350,
        title:'Add Crypto',
        resizable: false,
        frame: false, // Removes the frame
        autoHideMenuBar: true, // Auto hides menu bar for mac os
        webPreferences: {
            enableRemoteModule: true, //Need to be enabled for custom navbar to work
            contextIsolation: false,
            nodeIntegration:true
        }
    });
    
    //Turns off the menu bar for this specefic window
    addWindow.setMenuBarVisibility(false)
    // Loading the html file
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage Collection Handle
    addWindow.on('close', function(){
        addWindow = null;
    });
}

// Catch crypto:add
ipcMain.on('crypto:add', function(e, symbol, name) {
    mainWindow.webContents.send('crypto:add', symbol, name);
    addWindow.close();
});

function createClearWindow() {
    //Creating new clearWindow
    clearWindow = new BrowserWindow({
        width: 300,
        height: 150,
        title:'ALERT',
        resizable: false,
        frame: false, // Removes the frame
        autoHideMenuBar: true, // Auto hides menu bar for mac os
        webPreferences: {
            enableRemoteModule: true, //Need to be enabled for custom navbar to work
            contextIsolation: false,
            nodeIntegration:true
        }
    });
    
    //Turns off the menu bar for this specefic window
    clearWindow.setMenuBarVisibility(true)
    // Loading the html file
    clearWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'clearWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage Collection Handle
    clearWindow.on('close', function(){
        clearWindow = null;
    });
}

// Catch clearWindow:close
ipcMain.on('clearWindow:close', function(e) {
    clearWindow.close();
});

// Catch clearWindow:yes
ipcMain.on('clearWindow:yes', function(e){
    mainWindow.webContents.send('watchlist:clear');
    clearWindow.close();
});
 

function createAlertWindow() {
    //Creating new alertWindow
    alertWindow = new BrowserWindow({
        width: 300,
        height: 150,
        title:'ALERT',
        resizable: false,
        frame: false, // Removes the frame
        autoHideMenuBar: true, // Auto hides menu bar for mac os
        webPreferences: {
            enableRemoteModule: true, //Need to be enabled for custom navbar to work
            contextIsolation: false,
            nodeIntegration:true
        }
    });
    
    //Turns off the menu bar for this specefic window
    alertWindow.setMenuBarVisibility(true)
    // Loading the html file
    alertWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'alertWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage Collection Handle
    alertWindow.on('close', function(){
        alertWindow = null;
    });
}

// Catch alertWindow:close
ipcMain.on('alertWindow:close', function(e) {
    alertWindow.close();
});

// Catch alertWindow:open
ipcMain.on('alertWindow:open', function(e) {
    createAlertWindow();
});
// Catch addWindow from alertwindow
ipcMain.on('alertWindow:openadd', function(e) {
    alertWindow.close();
    createAddWindow();
});

function createAutoWindow() {
    //Creating new autoWindow
    autoWindow = new BrowserWindow({
        width: 300,
        height: 150,
        title:'AUTO',
        resizable: false,
        frame: false, // Removes the frame
        autoHideMenuBar: true, // Auto hides menu bar for mac os
        webPreferences: {
            enableRemoteModule: true, //Need to be enabled for custom navbar to work
            contextIsolation: false,
            nodeIntegration:true
        }
    });
    
    //Turns off the menu bar for this specefic window
    autoWindow.setMenuBarVisibility(true)
    // Loading the html file
    autoWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'autoWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage Collection Handle
    autoWindow.on('close', function(){
        autoWindow = null;
    });
}

// Create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label: 'Add Crypto',
                accelerator: process.platform == 'darwin' ? 'Command+G' : 
                'Ctrl+G',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear watchlist',
                accelerator: process.platform == 'darwin' ? 'Command+E' : 
                'Ctrl+E',
                click(){
                    createClearWindow();
                }
            },
            {
                label: 'Refresh prices',
                accelerator: process.platform == 'darwin' ? 'Command+R' : 
                'Ctrl+R',
                click(){
                    mainWindow.webContents.send('watchlist:reload');
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//If on Mac, add an empty object to menu. [BUG FIX LATER]
//if(process.platform == 'darwin'){
//    mainMenuTemplate.unshift({});
//}

// Adding Developer tools item not in production moe
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 
                'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'Reload'
            }
        ]
    });
};

