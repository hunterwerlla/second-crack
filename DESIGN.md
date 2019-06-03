# Design

## What?

This is a document to collect thoughts about architecture/languages/features. Primarially it's for
 figuring out what would actually be an improvement in the space.

## improvements over Artisan
- Artisan contains one giant main.py file. While it is being broken up currently, it is still over 55k lines,
pychram refuses to even syntax highlight it without manual config changes
- Artisan was built up over time leading to duplication. For example, adding a device requires at least 4 changes
in main.py
- Artisan has no tests which makes it hard to change
- Artisan has good usage and good feautres, but seems to be scary for developers to contribute to
- Using a client/server architecture means the frontend can be accessed on any web connected device, and means
it has a good seperation of layers
  - Of course, this comes with all of the downsides of client/server architecture including possible code duplication,
  communication issues, and increased resource usage when run on one device
- **Personally** I find python hard to work with for large projects, type checking is important for not having type
issues at runtime. This is especially compounded when the amount of features and devices supported is high.

## General architecture

Proposal: Program will follow a multiple process architecture to take advantage of the advantages
of different languages and the limitations of hardware.

## Components needed

### MVP
- Device communication layer (serial, hottop only)
- Local database communication (to store data locally)
- Builds on Linux
- Presentation layer (that connects to the core)

### Extended Components
- Device communication layer (BLE, Serial multiple devices)
- External/Network database communication
- Builds on OSX/Windows
- PID roasting as a device capability

## Supported device types

### MVP

- Serial (over USB or serial since OS's thankfully abstract this away)

Notes:
- Due to the wide range in device types, there needs to be a generic device type interface that
can abstract the underlying implementation away.

### Extended device types
- USB
- BLE
- Modbus

## Supported data output

### MVP
- flat file (csv with metadata)
- The frontend

### Extended data output

- SQLite
- Postgres?
- JSON?
- Mongo (?????)

## Settings/non roast related data

- Yaml (?)

## Front end

- Node/typescript

Notes:
- Most cross platform frontends are terrible, especially for a chart centered application,
NW.js with typescript seems like the best option

## Architecture diagram
Device layer
```
  _____________  USB/BT/Serial  _______________ device interface
 |   Device    |<------------->|  Device layer |<--->
 ---------------               -----------------
```

Core
```
                    (golang)
 Device Interface  _________        
           <----->|         |   Data interface
                  |  Core   |<----------->
                  |         |   Control interface
                  |_________|<----------->
```

Data layer
```
  _____________  USB/BT/Serial  _______________   hook
 |   Device    |<------------->|  Device layer |<--->
 ---------------               -----------------
```

Communication layer
```                   (golang)
     Data interface   ________   Frontend (websockets?)
   <---------------->| Server |<------------>
   Control interface |        |
   <---------------->|________|
```

Frontend
```
                         Frontend (NW.js)
  communication layer   ___________________
      <--------------->| -chart!           |
                       | -buttons!         |
                       | -terrible ball of |
                       | typescript!       |
                       |___________________|
```

### Architecture notes
- All data output goes through the same interface, real time streaming and bulk export are options
- Control encompases control and meta infromation like what things are connected

## Misc features

- Core can scan for devices based on known device types
- Some devices have different capabilities, frontend adjusts based on them
- Core communicates with the frontend over http2, even locally
- The ability to run the core and frontend on different machines
- Rpi as tested platform, must perform well on a rpi3