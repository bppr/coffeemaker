interface Hardware {
  // 0: pot present, 1: pot away
  getPotDetectorStatus(): 0 | 1

  // 0: off, 1: on
  getWarmerPlateStatus(): 0 | 1;

  // 0: off, 1: on
  getBoilerStatus(): 0 | 1

  // 0: empty, 1: non-empty
  getReservoirStatus(): 0 | 1

  // 0: not pushed, 1: pushed
  getButtonStatus(): 0 | 1

  // 0: off, 1: on
  setBoilerState(state: 0 | 1): void
  setIndicatorLightState(state: 0 | 1): void
  setValveState(state: 0 | 1): void
  setWarmerState(state: 0 | 1): void
}

declare function getHardware(): Hardware;

export {
  Hardware, 
  getHardware
}