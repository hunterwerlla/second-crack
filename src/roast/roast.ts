import { Configuration } from 'configuration/configuration'

let scanning = false
let settings: Configuration | undefined = undefined
const startButton = document.getElementById('start')

const scanner = async () => {
    while (scanning) {
        if (!settings || !settings.activeDevice) {
            continue
        }
        settings.activeDevice.poll()
    }
}

if (startButton) {
    startButton.onclick = () => {
        if (!scanning) {
            console.log('started')
            scanning = true
            scanner()
        } else {
            console.log('stopped')
            scanning = false
        }
    }
}

export function setSettings(config: Configuration) {
    console.log(config)
    settings = config
}
