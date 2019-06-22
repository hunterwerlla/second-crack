use std::error::Error;
use super::Device;

pub mod serial_scanner;

//pub fn scan_all_device_types() {}

pub trait Scanner<T: Device> {
    fn scan() -> Result<Vec<T>, Box<Error>>;
}
