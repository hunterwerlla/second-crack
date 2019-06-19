mod device;

use device::{Device, DataPoint, DataType};
use std::fmt::Error;

struct Whatever{
}

impl device::Device for Whatever {
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

fn main() {
    let poll = Whatever::poll().unwrap();
    println!("Hello, {}!", poll.first().unwrap().value);
}
