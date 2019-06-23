import { DataPoint } from "device"

export class HotTop {
    public constructor() { }

    public poll(): DataPoint[] | undefined {
        return undefined
    }

    public connect(): void {

    }

    public getSensorString(dataType: number, dataIndex: number): string {
        return ""
    }
}