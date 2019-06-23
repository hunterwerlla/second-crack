import { app, BrowserWindow } from "electron"
import * as path from "path"

let mainWindow: Electron.BrowserWindow | undefined

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1000,
  })

  mainWindow.loadFile(path.join(__dirname, "../assets/index.html"))

  mainWindow.on("closed", () => {
    mainWindow = undefined
  })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})