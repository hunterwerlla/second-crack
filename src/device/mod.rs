use std::fmt::Error;
pub mod serial_device;
pub mod device_scanner;

pub enum DataType {
    Temperature
}

pub struct DataPoint{
    pub timestamp: std::time::SystemTime,
    pub value: f64,
    pub data_type: DataType,
    pub data_index: i32
}

pub trait Device {
    fn poll() -> Result<Vec<DataPoint>, Error>;
    fn connect() -> Result<(), Error>;
    fn get_sensor_string(data_type: DataType, offset: i32) -> Option<String>;
}
