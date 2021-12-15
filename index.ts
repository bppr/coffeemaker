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

//  FEATURE: START BREWING
//  when the button is pressed, the coffee maker must start brewing
//    if the reservoir is empty, or the pot is not present,
//      flash the indicator light 3 times to indicate an error
//      and do not proceed
//    if the boiler is NOT empty, turn it on
//    and close the valve to allow water to flow

//  FEATURE: PAUSE BREWING
//    when the coffeemaker is brewing, and the button is pressed, start brewing 
//    open the valve to stop the flow of water and turn off the boiler

//  FEATURE: FIRE AND / OR HEAT DAMAGE PREVENTION
//    if the reservoir becomes empty while running, turn boiler off
//    turn off the warmer plate after 60 minutes

//  TWIST: NEW BOSS EXPECTS TESTS!

export function greeting() {
  return "Hello";
}

function main() {
  let isBrewing = false,
    hardware = getHardware(),
    buttonWasPressedLastTick = false;

  while(true) {
    if(hardware.getButtonStatus() === 1 && !buttonWasPressedLastTick) {

      buttonWasPressedLastTick = true;

      if(!isBrewing) {
        if(hardware.getReservoirStatus() === 1 && hardware.getPotDetectorStatus() === 1) {
          hardware.setBoilerState(1);
          hardware.setValveState(0);
          hardware.setWarmerState(1);
          isBrewing = true;
        } 

      } else {
        hardware.setValveState(1);
        hardware.setBoilerState(0);
      }

    } else {
      buttonWasPressedLastTick = false;
    }
  }
}