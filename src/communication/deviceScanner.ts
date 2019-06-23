import * as SerialPort from 'serialport'
import { supportedMachines } from 'machines/supportedMachines'
import { Device } from 'device/device'
import { SerialDevice } from 'device/serial'

export async function findDevices() {
    return await findSerialDevices()
}

async function findSerialDevices(): Promise<Device[]> {
    let deviceList: Device[] = []
    const serialPorts = await scanSerial()
    if (!serialPorts || serialPorts.length === 0) {
        return deviceList
    }
    for (const machine of supportedMachines) {
        // only check serial machines
        if (!machine.hasOwnProperty('serialPort')) {
            continue
        }
        const serialMachine: Device & SerialDevice = machine as Device &
            SerialDevice
        for (const port of serialPorts) {
            if (serialMachine.checkDeviceMatches(port)) {
                let foundMachine = Object.create(serialMachine)
                foundMachine.serialPort = port
                deviceList.push(foundMachine)
            }
        }
    }
    return deviceList
}

async function scanSerial(): Promise<SerialPort.PortInfo[]> {
    const ports = await SerialPort.list()
    return ports
}
