/**
 * poke-freak.js
 * 
 * @author yuki
 */

'use strict';

const electron = require('electron');



let mainWindow;

electron.app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        electron.app.quit();
    }
});

electron.app.on('ready', () => {
    mainWindow = new electron.BrowserWindow({ width: 1024, height: 800, resizable: true });
    mainWindow.loadURL(`file://${__dirname}/app/view/title.html`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    // mainWindow.openDevTools();
});

