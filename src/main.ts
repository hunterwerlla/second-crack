import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { findDevices } from './communication/deviceScanner'

let mainWindow: Electron.BrowserWindow | undefined

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 800,
        width: 1000,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadFile(path.join(__dirname, '../assets/index.html'))

    mainWindow.on('closed', () => {
        mainWindow = undefined
    })

    findDevices().then(deviceList => {
        console.log(deviceList)
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
