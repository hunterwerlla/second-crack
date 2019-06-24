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
    connect(connectionOptions: any): void
    poll(): DataPoint[] | undefined
    command(commandParams: any): void
}

export interface DeviceInfo {
    /**
     * The normal name of the device
     */
    deviceName: string
    /**
     * For devices that have a port, a human readable string
     */
    devicePort: string | undefined
    /**
     * The method the device uses for communication
     */
    deviceCommunicationType: DeviceCommunicationType
    /**
     * Uses the data type and data index to spit back the device specific meaning.
     * Example: dataType=Temperature, dataIndex=0 returns "Bean temp"
     * @param dataType
     * @param dataIndex
     */
    getSensorString(dataType: number, dataIndex: number): string
    /**
     * Device specific query to check if device matches.
     * Query type is based on deviceCommunicationType
     * @param query
     */
    checkDeviceMatches(query: any): boolean
}

export interface Device extends DeviceInfo, DeviceCommunication {}
