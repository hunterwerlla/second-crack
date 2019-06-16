pub enum DataType {
    Temperature
}

pub struct DataPoint{
    pub timestamp: std::time::SystemTime,
    pub value: f64,
    pub data_type: DataType
}

pub trait Device {
    fn poll() -> Vec<DataPoint>;
}
