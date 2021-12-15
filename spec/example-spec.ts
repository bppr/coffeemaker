// output only depends on input and nothing else - no state, no side effects
function greet(name: string) {
  return `Hello, ${name}!`
}

// object with internal state
class Counter {
  constructor(private _value: number = 0) {}

  get value(): number { return this._value }

  tick() {
    this._value += 1;
    return this;
  }
}

// 'stateless' object / external state

describe('a simple test', () => {
  it('does something with a returned value', () => {
    expect(greet('World')).toEqual('Hello, World!');
  });

  it('works with stateful objects', () => {
    const c = new Counter();
    c.tick();
    expect(c.value).toEqual(1);
  });

  it('works with multistateful objects', () => {
    const result = new Counter().tick().tick().tick();

    expect(result.value).toEqual(3);
  });
})