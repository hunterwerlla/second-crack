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

export interface Device {
    deviceCommunicationType: DeviceCommunicationType
    poll(): DataPoint[] | undefined
    connect(connectionOptions: any): void
    getSensorString(dataType: number, dataIndex: number): string
}
