const {
    ipcRenderer
} = require('electron')

ipcRenderer.send('capture', {
    title: 'test',
    i: 0
})

// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // "pong"이 출력됩니다.

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//     console.log(arg) // "pong"이 출력됩니다.
// })
// ipcRenderer.send('asynchronous-message', 'ping')