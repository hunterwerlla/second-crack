import { DataType, DataPoint, Device, DeviceCommunicationType } from '../device/device'

export class Test implements Device {
    public deviceName: string = 'TestDevice'
    public devicePort = undefined
    public deviceCommunicationType = DeviceCommunicationType.Test

    getSensorString(dataType: number, dataIndex: number): string {
        return ''
    }
    checkDeviceMatches(query: any): boolean {
        return true
    }
    connect(connectionOptions: any): void {}
    poll(): DataPoint[] | undefined {
        return [
            {
                timestamp: Date.now(),
                dataType: DataType.Temperature,
                value: Math.random() * 600,
                dataIndex: 0
            }
        ]
    }
    command(commandParams: any): void {
        throw new Error('Method not implemented.')
    }
}
