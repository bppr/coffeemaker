export interface AppRequest {
  getParam(key: string): string
}

export type AppResponse = {
  status: number
  body: string
}

const DEFAULT_WHITELIST = [ 'robocop@example.com' ]

function Router(whitelist = DEFAULT_WHITELIST) {
  return {
    root(request: AppRequest): AppResponse {
      if(whitelist.includes(request.getParam('username')))
        return { status: 200, body: 'OK' };
      
      return { status: 403, body: 'Forbidden' };
    }
  }
}

export class MockAppRequest implements AppRequest {
  constructor(
    private keys: {[key: string]: string}
  ) {}

  getParam(key: string): string {
    return this.keys[key];
  }
}

describe('router', () => {
  it('allows whitelisted usernames at root URL', () => {
    const router = Router(['name@example.com']);
    const request = new MockAppRequest({ username: 'name@example.com'});

    const response = router.root(request);

    expect(response.status).toEqual(200);
  });

  it('disallows whitelisted names at root URL', () => {
    const router = Router(['name@example.com']);
    const request = new MockAppRequest({ username: 'not-name@example.com'});
    
    const response = router.root(request);

    expect(response.status).toEqual(403);
  });
})