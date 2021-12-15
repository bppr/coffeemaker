import { CoffeeMaker, CoffeeUserInterface } from '../index';

describe('coffee', () => {
  it('starts brewing when the button is pressed', () => {
    const mockUI = { wasStartRequested() { return true }};
    const coffeeMaker = new CoffeeMaker(mockUI);

    coffeeMaker.tick();

    expect(coffeeMaker.isBrewing).toBe(true);
  });

  it('does not brewing when the button is not pressed', () => {
    const mockUI = { wasStartRequested() { return false }};
    const coffeeMaker = new CoffeeMaker(mockUI);

    coffeeMaker.tick();

    expect(coffeeMaker.isBrewing).toBe(false);
  });
});

describe('UserInterface', () => {
  function mockHardwareButton(status: 0 | 1) {
    return { getButtonStatus() { return status }};
  }

  it('reports a start was requested when a button was pressed', () => {
    const ui = new CoffeeUserInterface(mockHardwareButton(1));
    expect(ui.wasStartRequested()).toBe(true);
  });

  it('does not report a start was requested when button was not pressed', () => {
    const ui = new CoffeeUserInterface(mockHardwareButton(0));
    expect(ui.wasStartRequested()).toBe(false);
  });

  it('only reports a start was requested for the first detection', () => {
    const ui = new CoffeeUserInterface(mockHardwareButton(1));

    const result1 = ui.wasStartRequested();
    const result2 = ui.wasStartRequested();
    const result3 = ui.wasStartRequested();

    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
  });
 });