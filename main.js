'use strict';

require('electron-reload')(__dirname);
const username = require('username')
const {ipcMain} = require('electron')
// ipcMain.send('test', 'teste')
var data;

const fs = require('fs')
var uname;
username().then(username => {
  uname = username;
  if (!fs.existsSync('/home/'+uname+'/.notes')) {
    fs.mkdirSync('/home/'+uname+'/.notes')
  }
  if (!fs.existsSync('/home/'+uname+'/.notes/notes.json')) {
    fs.writeFile('/home/'+uname+'/.notes/notes.json',
    '{"notas": [{"_id": 0, "titulo": "Nota", "texto": ""}],"notaAtiva": 0}');
  }

  data = fs.readFileSync('/home/'+uname+'/.notes/notes.json')
})

ipcMain.on('askData', (ev, arg) => {
  ev.sender.send('sendData', data.toString());
})

ipcMain.on('dataUpdate', (ev, arg) => {
  fs.writeFile('/home/'+uname+'/.notes/notes.json', JSON.stringify(arg))
})

const electron = require('electron')
// In main process.

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// BrowserWindow.setMenu(null);

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.setMenu(null);
  mainWindow.setTitle("Notes");

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
