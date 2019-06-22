use std::error::Error;

use super::Scanner;
use super::super::serial_device::SerialDevice;

pub struct SerialScanner {}

impl Scanner<SerialDevice> for SerialScanner {
    fn scan() -> Result<Vec<SerialDevice>, Box<Error>> {
        let ports = serialport::available_ports()?;
        let mut devices: Vec<SerialDevice> = Vec::new();
        // TODO add extracting usb info here if possible
        for p in ports {
            devices.push(SerialDevice{info: p})
        }
        Ok(devices)
    }
}

