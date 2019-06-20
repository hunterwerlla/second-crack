use device::Device;
use std::fmt::Error;

trait scanner {
    fn scan() -> Result<Vec<Device>, Error>;
}

pub fn scan_all_device_types() {

}