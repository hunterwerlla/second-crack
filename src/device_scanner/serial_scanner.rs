use super::Scanner;
use super::super::device::SerialDevice;
use std::fmt::Error;

pub struct SerialScanner {}

impl Scanner<SerialDevice> for SerialScanner {
    fn scan() -> Result<Vec<SerialDevice>, Error> {
        let ports = serialport::available_ports().unwrap();
        for p in ports {
            println!("  {}", p.port_name);
        }
        Ok(vec![SerialDevice{}])
    }
}

