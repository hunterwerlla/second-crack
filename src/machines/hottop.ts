import { DataPoint, Device, DeviceCommunicationType } from 'device'

export class HotTop implements Device {
    public deviceCommunicationType = DeviceCommunicationType.Serial

    public constructor() {}

    public poll(): DataPoint[] | undefined {
        return undefined
    }

    public connect(connectionOptions: any): void {}

    public getSensorString(dataType: number, dataIndex: number): string {
        return ''
    }
}
