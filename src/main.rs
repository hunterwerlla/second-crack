mod device;

use device::{Device, DataPoint, DataType};

struct Whatever{
}

impl device::Device for Whatever {
    fn poll() -> Vec<DataPoint>{
        let x = vec![DataPoint {
            timestamp: std::time::SystemTime::now(),
            value: 0.0,
            data_type: DataType::Temperature
        }];
        return x
    }
}

fn main() {
    println!("Hello, {}!", Whatever::poll()[0].value);
}
