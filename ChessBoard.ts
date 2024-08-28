import Auth from './Auth';

describe('Auth', () => {
  let auth;

  beforeEach(() => {
    auth = new Auth ();
  });

  it('should be not authenticated by default', () => {
    expect(auth.isAuthenticated()).toBe(false);
  });

  it('should authenticate when login is called', () => {
    auth.login(() => {});
    expect(auth.isAuthenticated()).toBe(true);
  });

  it('should not authenticate when logout is called', () => {
    auth.logout(() => {});
    expect(auth.isAuthenticated()).toBe(false);
  });

  it('should call the callback when login is called', () => {
    const cb = jest.fn();
    auth.login(cb);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should call the callback when logout is called', () => {
    const cb = jest.fn();
    auth.logout(cb);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
