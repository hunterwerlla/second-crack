import * as SerialPort from 'serialport'

import { DataPoint, Device, DeviceCommunicationType } from '../device/device'
import { SerialConnection } from '../connection/serial'
import { SerialDevice } from '../device/serial'

export class HotTop implements Device, SerialDevice {
    private state: any
    public serialPort: SerialPort.PortInfo | undefined
    public devicePort: string | undefined
    public readonly deviceName = 'Hottop'
    public readonly deviceCommunicationType = DeviceCommunicationType.Serial

    public constructor() {
        this.state = {}
    }

    public connect(connectionOptions: SerialConnection): void {}

    public poll(): DataPoint[] | undefined {
        return undefined
    }

    public command(commandParams: any): void {
        return undefined
    }

    public getSensorString(dataType: number, dataIndex: number): string {
        return ''
    }

    public checkDeviceMatches(query: any): boolean {
        return true
    }
}
