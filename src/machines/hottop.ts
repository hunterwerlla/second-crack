import { DataPoint, Device, DeviceCommunicationType } from 'device'
import { SerialConnection } from 'connection/serial'

export class HotTop implements Device {
    private state: any
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
}
