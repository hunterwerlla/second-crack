use std::fmt::Error;

pub enum DataType {
    Temperature
}

pub struct SerialDevice {

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
