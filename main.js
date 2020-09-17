// Modules to control application life and create native browser window
const {app, ipcMain, BrowserWindow} = require('electron')
const path = require('path')
const fs = require('fs')

let mainWindow;
let captureWindow;

function createCapture() {
  console.log()
  captureWindow = new BrowserWindow({
    width: 600,
    height: 600,
    // modal: false,
    show: false,
    frame: true,
    transparent: true,
    // alwaysOnTop: true,
  });

  captureWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
      event.preventDefault();
      // create your BrowserWindow here :)
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

  setTimeout(()=>createCapture(), 1000)
}

// 앱 실행
app.whenReady().then(() => {
  createWindow()
  
  // 이미 실행중일 경우에 create 안함.
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Cmd + Q 로 종료
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // "ping" 출력
//   event.reply('asynchronous-reply', 'pong')
// })
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // "ping" 출력
//   event.returnValue = 'pong'
// })

