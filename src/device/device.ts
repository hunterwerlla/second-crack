export enum DataType {
    Temperature,
    FanSpeed
}

export interface DataPoint {
    timestamp: number
    value: number,
    dataType: DataType,
    dataIndex: number
}

export interface Device {
    poll(): DataPoint[] | undefined,
    connect(): void,
    getSensorString(dataType: number, dataIndex: number): string
}