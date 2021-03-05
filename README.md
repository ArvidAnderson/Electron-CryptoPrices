# Glanze @ Crypto

This is small project is an application made for have a quick glanze at the crypto prices. You can select from different cryptos which then will be added to your watchlist. The application saves your added crypto to a json file using the [electron-store]([GitHub - sindresorhus/electron-store: Simple data persistence for your Electron app or module - Save and load user preferences, app state, cache, etc](https://github.com/sindresorhus/electron-store)) module. The json file is located in your userdata directory for example on windows in your appdata folder. This is by no mean the right way to create your application as it uses the old nodeIntegration: true which is a security risk, even tough it dosen't matter on this program it should not be used.

# TDL

- Add refresh prices function, right now it's only refreshing prices on restart

- Add tray icon

- Add notifications

- Full mac compatibility

# Dependencies

- crypto-price : 0.0.6

- custom-electron-titlebar : ^3.2.6

- electron : ^12.0.0

- electron-store : ^7.0.2
