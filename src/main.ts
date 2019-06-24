import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { findSettingsPath } from 'configuration/configuration'

let mainWindow: Electron.BrowserWindow | undefined
let popupWindow: Electron.BrowserWindow | undefined
let settingsPath: string = findSettingsPath()
let setupNeeded = true

function setup() {
    popupWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },
        parent: mainWindow,
        modal: true
    })
    popupWindow.loadFile(path.join(__dirname, '../assets/setup.html'))
    mainWindow!.blur()

    popupWindow.on('closed', () => {
        popupWindow = undefined
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

const { ipcMain } = require('electron')
ipcMain.on('device-received', (event: any, arg: any) => {
    if (mainWindow) {
        mainWindow.webContents.send('device-received', arg)
    }
})
