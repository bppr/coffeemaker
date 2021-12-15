import { Hardware, getHardware } from './hardware';

interface Hardware_UI {
  getButtonStatus(): 0 | 1;
}

export interface UserInterface {
  wasStartRequested(): boolean;
}

export class CoffeeUserInterface implements UserInterface {
  private prevState: 0 | 1;

  constructor(private hardware: Hardware_UI) {
    this.prevState = 0;
  }

  wasStartRequested(): boolean {
    const status = this.hardware.getButtonStatus();
    const result = status === 1 && this.prevState !== 1;

    this.prevState = status;

    return result;
  }
}

export class CoffeeMaker {
  public isBrewing: boolean;

  constructor(private ui: UserInterface) {
    this.isBrewing = false;
  }

  tick() {
    if(this.ui.wasStartRequested())
      this.isBrewing = true;
  }
}

function main() {
  const hardware = getHardware()
  const ui = new CoffeeUserInterface(hardware);
  const coffee = new CoffeeMaker(ui);

  while(true) {
    coffee.tick();
  }
}

// function main() {
//   let isBrewing = false,
//     hardware = getHardware(),
//     buttonWasPressedLastTick = false;
// 
//   while(true) {
//     if(hardware.buttonWasPressed() === 1 && !buttonWasPressedLastTick) {
//       buttonWasPressedLastTick = true;
//       if(!isBrewing) {
//         if(hardware.getReservoirStatus() === 1 && hardware.getPotDetectorStatus() === 1) {
//           hardware.setBoilerState(1);
//           hardware.setValveState(0);
//           hardware.setWarmerState(1);
//           isBrewing = true;
//         } 
//       } else {
//         hardware.setValveState(1);
//         hardware.setBoilerState(0);
//       }
//     } else {
//       buttonWasPressedLastTick = false;
//     }
//   }
// }