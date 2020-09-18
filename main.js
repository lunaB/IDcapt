// Modules to control application life and create native browser window
const {app, ipcMain, shell, screen, BrowserWindow, desktopCapturer} = require('electron')
const path = require('path')
const fs = require('fs')
const electron = require('electron')
const os = require('os')

let mainWindow;
let captureWindow;
let capture;

function createCapture() {
  console.log()
  captureWindow = new BrowserWindow({
    width: 600,
    height: 600,
    modal: false,
    show: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
  });
  captureWindow.loadFile('capture.html');
  // captureWindow.webContents.openDevTools();
  captureWindow.show();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
  // mainWindow.webContents.openDevTools()
  mainWindow.show();
}

// 앱 실행
app.whenReady().then(() => {
  createWindow()
  createCapture()
  
  // 이미 실행중일 경우에 create 안함.
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Cmd + Q 로 종료
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// 이벤트
ipcMain.on('capture', (data) => {
  console.log(captureWindow.getBounds())
  let bounds = captureWindow.getBounds()

  desktopCapturer.getSources({
    types: ['window', 'screen']
  }).then(async sources => {
    for(let source of sources) {
      console.log(source.name);
      
    }
  })
})

// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // "ping" 출력
//   event.reply('asynchronous-reply', 'pong')
// })
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // "ping" 출력
//   event.returnValue = 'pong'
// })

