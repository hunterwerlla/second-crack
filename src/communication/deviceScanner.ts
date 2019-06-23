import * as SerialPort from 'serialport'

SerialPort.list().then(
    (ports: any) => ports.forEach(console.log),
    (err: any) => console.error(err)
)
