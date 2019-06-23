export enum DataType {
    Temperature,
    FanSpeed
}

export enum DeviceCommunicationType {
    Serial
}

export interface DataPoint {
    timestamp: number
    value: number
    dataType: DataType
    dataIndex: number
}

export interface DeviceCommunication {
    deviceCommunicationType: DeviceCommunicationType
    connect(connectionOptions: any): void
    poll(): DataPoint[] | undefined
    command(commandParams: any): void
}

export interface DeviceInfo {
    deviceName: string
    getSensorString(dataType: number, dataIndex: number): string
}

export interface Device extends DeviceInfo, DeviceCommunication {}
