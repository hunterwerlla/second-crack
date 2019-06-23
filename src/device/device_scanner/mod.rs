use std::error::Error;
use super::Device;
use crate::device::device_scanner::serial_scanner::SerialScanner;

pub mod serial_scanner;

pub fn scan_all_device_types() -> Vec<impl Device> {
    let serial_devices = SerialScanner::scan().unwrap();
    serial_devices
}

pub trait Scanner<T: Device> {
    fn scan() -> Result<Vec<T>, Box<Error>>;
}
