import { greeting } from '../index';

describe('coffee', () => {
  it('imports the greeting', () => {
    expect(greeting()).toEqual('Hello');
  });
});