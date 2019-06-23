import * as SerialPort from 'serialport'

export interface SerialDevice {
    serialPort: SerialPort.PortInfo | undefined
}
