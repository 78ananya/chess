import Auth from './Auth';

describe('Auth class', () => {
  let auth;

  beforeEach(() => {
    auth = new Auth();
  });

  it('should be initially not authenticated', () => {
    expect(auth.isAuthenticated()).toBe(false);
  });

  it('should login successfully', () => {
    let loginCalled = false;
    auth.login(() => {
      loginCalled = true;
    });
    expect(auth.isAuthenticated()).toBe(true);
    expect(loginCalled).toBe(true);
  });

  it('should logout successfully', () => {
    auth.login(() => {});
    let logoutCalled = false;
    auth.logout(() => {
      logoutCalled = true;
    });
    expect(auth.isAuthenticated()).toBe(false);
    expect(logoutCalled).toBe(true);
  });
});
