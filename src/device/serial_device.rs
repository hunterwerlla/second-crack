use std::fmt::Error;
use serialport::SerialPortInfo;
use super::{Device, DataType, DataPoint};

pub struct SerialDevice {
    pub info: SerialPortInfo
}

impl Device for SerialDevice {
    fn poll() -> Result<Vec<DataPoint>, Error>{
        let x = vec![DataPoint {
            timestamp: std::time::SystemTime::now(),
            value: 0.0,
            data_type: DataType::Temperature,
            data_index: 0
        }];
        return Ok(x)
    }

    fn connect() -> Result<(), Error> {
        Ok(())
    }

    fn get_sensor_string(data_type: DataType, offset: i32) -> Option<String> {
        match(data_type, offset) {
            (DataType::Temperature, 0) => Some(String::from("Bean temp")),
            _ => None
        }

    }
}