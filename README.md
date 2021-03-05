# Glanze @ Crypto

This is small project is an application made for have a quick glanze at the crypto prices. You can select from different cryptos which then will be added to your watchlist. 

## Storage/Database

The application saves the cryptos you added to your watchlist to a json file using the [electron-store](https://github.com/sindresorhus/electron-store) module. The json file is located in your userdata directory for example on windows in your appdata folder. This acts as an local database.

## Security

This is by no mean the right way to create your application as it uses the old nodeIntegration: true which is a security risk, even tough it dosen't matter on this program it should not be used.

## Theme

The application is following an "apple" color theme using the dark Blue and Grey6 palette [apple colors](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/) rgb. [Conrad F](https://github.com/conradfogdestam) came up with this idea of using these colors.

I did use the [materializecss](https://materializecss.com/) frontend framework for the base styling because it's very friendly aswell as responsive to work with.

## TDL

- Add notifications

- Full mac compatibility

- Build package for Windows and Mac

## Dependencies

- crypto-price : 0.0.6

- custom-electron-titlebar : ^3.2.6

- electron : ^12.0.0

- electron-store : ^7.0.2

## Structure

```
├── assets
│   ├── cryptoicons
│   │── css
│   │── icons
│   │── img
├── node_modules
│   ├── * (All node modules)
├── addWindow.html
├── crypto_api.js
├── crypto_names.js
├── main.js
├── mainWindow.html
├── package.json
├── package-lock.json
├── preload.js
├── README-md
└── renderer.js
```
