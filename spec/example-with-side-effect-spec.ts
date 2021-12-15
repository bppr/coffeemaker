import { 
  AppRequest, 
  AppResponse, 
  MockAppRequest 
} from './example-with-mock-spec';

declare function getRealAppDatabase(): AppDatabase;

type Issue = {
  id?: string,
  type: 'bug' | 'feature'  | 'spike' | string,
  text: string
}

interface AppDatabase {
  issues: {
    save(issue: Issue): void
    load(id: string): Issue | undefined
    loadAll(): Issue[]
  }
}

function SideEffectRouter(database: AppDatabase = getRealAppDatabase()) {
  return {
    createIssue(request: AppRequest): AppResponse {
      const issue = {
        type: request.getParam('type'),
        text: request.getParam('text')
      };

      database.issues.save(issue);

      return { status: 200, body: JSON.stringify(issue) };
    }
  }
}

describe('router', () => {
  it('creates a user', () => {
    const mockDatabase = {
      issues: { 
        saves: new Array<Issue>(),

        save(issue: Issue) {
          this.saves.push(issue);
        },

        loadAll() { return this.saves },
        load(id: string) { return undefined }
      }
    }

    const router = SideEffectRouter(mockDatabase);
    const mockRequest = new MockAppRequest({ type: 'bug', text: 'it broke' });

    const response = router.createIssue(mockRequest);

    expect(mockDatabase.issues.saves).toEqual([{ type: 'bug', text: 'it broke'}]);
    expect(response.status).toEqual(200);
  });

  it('does it with a jasmine mock, other libraries work for this too', () => {
    const mockDatabase = {
      issues: jasmine.createSpyObj('mockDB', ['save', 'loadAll', 'load'])
    }
    
    const router = SideEffectRouter(mockDatabase);
    const mockRequest = new MockAppRequest({ type: 'bug', text: 'it broke' });
    const response = router.createIssue(mockRequest);

    expect(mockDatabase.issues.save)
      .toHaveBeenCalledOnceWith({ type: 'bug', text: 'it broke' });

    expect(response.status).toEqual(200);
  });
})