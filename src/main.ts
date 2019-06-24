import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { findDevices } from './communication/deviceScanner'

let mainWindow: Electron.BrowserWindow | undefined
let popupWindow: Electron.BrowserWindow | undefined
let setupNeeded = true

function setup() {
    popupWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },
        parent: mainWindow
    })
    popupWindow.loadFile(path.join(__dirname, '../assets/setup.html'))
    mainWindow!.blur()

    popupWindow.on('closed', () => {
        if (mainWindow) {
            mainWindow.focus()
        }
    })
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        height: 800,
        width: 1000,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadFile(path.join(__dirname, '../assets/main.html'))

    mainWindow.on('closed', () => {
        mainWindow = undefined
    })
}

function start() {
    createMainWindow()

    if (setupNeeded) {
        setup()
    }

    findDevices().then(deviceList => {
        console.log(deviceList)
    })
}

app.on('ready', start)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        start()
    }
})
