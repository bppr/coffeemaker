import { greeting } from '../index';

describe('coffee', () => {
  it('imports the greeting', () => {
    expect(greeting()).toEqual('Hello');
  });

  it('fails a test', () => {
    expect(true).toBe(false);
  });
});