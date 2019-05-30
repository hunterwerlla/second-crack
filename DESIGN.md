# Design

## What?

This is a document to collect thoughts about architecture/languages/features. Primarially it's for
 figuring out what would actually be an improvement in the space.

## General architecture

Proposal: Program will follow a multiple process architecture to take advantage of the advantages
of different languages and the limitations of hardware.

## Components needed:
- Device communication layer (serial, hottop only)
- Local database communication (to store data locally)
- Builds on Linux
- Presentation layer (that connects to the )

### Extended Components
- Device communication layer (BLE, Serial multiple devices)
- External/Network database communication
- Builds on OSX/Windows
- PID roasting as a device capability

## Supported device types 


- Serial (over USB or serial)

Due to the wide range in device types, there needs to be a generic device type interface that
can abstract the underlying implementation away

### Extended device types 
- USB 
- BLE 

## Supported data output

- flat file

## Extended data output 

- SQLite 
- Postgres?
- Mongo (?????)

## Settings/non roast related data 

- Yaml (?)

## Front end 

- Node/typescript?

Most cross platform frontends are terrible, electron/nw.js with typescript may actually be the best option

## Architecture diagram
Device layer
```
  _____________  USB/BT/Serial  _______________   hook
 |   Device    |<------------->|  Device layer |<--->
 ---------------               -----------------
```

Core
```              
                   Core
  Device Layer    _________        
          <----->|         |       frontend
                 |         |<-------->
          <----->|         |
  Data Layer     |_________|        
```

Data Layer
```
  _____________  USB/BT/Serial  _______________   hook
 |   Device    |<------------->|  Device layer |<--->
 ---------------               -----------------
```

Frontend
```              
                   Frontend
           Core   __________________       
          <----->|  chart!          | 
                 | buttons!         |
                 | terrible ball of |
                 | typescript       |
                 |__________________|        
```

## Misc features 

- Core can scan for devices based on known device types 
- Some devices have different capabilitees, frontend adjusts based on them
- Core communicates with the frontend over websockets (?), even locally (???)
- The ability to run the core and frontend on different machines (maybe)
- Rpi as tested platform