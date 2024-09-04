import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Auth from './auth';

Enzyme.configure({ adapter: new Adapter() });

describe('Auth class', () => {
  let auth;

  beforeEach(() => {
    auth = new Auth();
  });

  test('constructor initializes authenticated property to false', () => {
    expect(auth.authenticated).toBe(false);
  });

  test('login sets authenticated property to true and calls callback', () => {
    const cb = jest.fn();
    auth.login(cb);
    expect(auth.authenticated).toBe(true);
    expect(cb).toHaveBeenCalled();
  });

  test('logout sets authenticated property to false and calls callback', () => {
    auth.authenticated = true;
    const cb = jest.fn();
    auth.logout(cb);
    expect(auth.authenticated).toBe(false);
    expect(cb).toHaveBeenCalled();
  });

  test('isAuthenticated returns true if authenticated', () => {
    auth.authenticated = true;
    expect(auth.isAuthenticated()).toBe(true);
  });

  test('isAuthenticated returns false if not authenticated', () => {
    expect(auth.isAuthenticated()).toBe(false);
  });
});
