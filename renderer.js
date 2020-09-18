const {
    ipcRenderer
} = require('electron')

// 캡처버튼 클릭시
let captureBtn = document.getElementById("captureBtn")
captureBtn.addEventListener('click', () => {
    ipcRenderer.send('capture', {
        title: 'test',
        pr: window.devicePixelRatio
    })
})


// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // "pong"이 출력됩니다.

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//     console.log(arg) // "pong"이 출력됩니다.
// })
// ipcRenderer.send('asynchronous-message', 'ping')