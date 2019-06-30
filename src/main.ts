import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { createSettings, loadSettings, settingsExist, Configuration } from './configuration/configuration'
import { Device } from 'device/device'

let mainWindow: Electron.BrowserWindow | undefined
let popupWindow: Electron.BrowserWindow | undefined
let setupNeeded = false
let settings: Configuration = { activeDevice: undefined, configuredDevices: [] }

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
    if (settingsExist()) {
        settings = loadSettings()
        // TODO make this async and make it error handle
        // settings!.activeDevice!.connect(undefined)
    } else {
        setupNeeded = true
    }

    createMainWindow()

    if (setupNeeded) {
        setup()
    } else {
        mainWindow!.on('ready-to-show', () => {
            mainWindow!.webContents.send('settings-changed', settings)
        })
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
ipcMain.on('initial-device-received', (event: any, arg: any) => {
    if (!mainWindow) {
        throw new Error('Windows are in a bad state, main window closed without closing pop up!')
    }
    createSettings({ device: arg as Device })
    mainWindow.webContents.send('settings-changed', settings)
})
