import { Device } from '../device/device'
import * as fs from 'fs'

function findSettingsPath(): string {
    return 'settings.json'
}

function writeSettings(settingsPath: string, configruation: Configuration) {
    fs.writeFileSync(settingsPath, JSON.stringify(configruation, undefined, '\t'))
}

export interface Configuration {
    /**
     * The active device
     */
    activeDevice: Device | undefined
    /**
     * Currently configured devices
     */
    configuredDevices: Device[]
}

export function createSettings(args: { device: Device }): Configuration {
    const configruation: Configuration = {
        activeDevice: args.device,
        configuredDevices: [args.device]
    }
    const settingsPath = findSettingsPath()
    writeSettings(settingsPath, configruation)
    return configruation
}

export function loadSettings(): Configuration {
    const settingsPath = findSettingsPath()
    return JSON.parse(fs.readFileSync(settingsPath, 'utf8')) as Configuration
}

export function settingsExist(): boolean {
    const settingsPath = findSettingsPath()
    try {
        fs.accessSync(settingsPath)
        return true
    } catch (err) {
        return false
    }
}
