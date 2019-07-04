import { HotTop } from './hottop'
import { Test } from './testMachine'
import { Device } from '../device/device'

export const supportedMachines: Device[] = [new Test(), new HotTop()]
