import { register, unregister, isLocalhost } from './serviceWorker';

describe('isLocalhost function', () => {
  it('should return true for localhost', () => {
    delete window.location;
    window.location = { hostname: 'localhost' };
    expect(isLocalhost()).toBe(true);
  });

  it('should return true for [::1]', () => {
    delete window.location;
    window.location = { hostname: '[::1]' };
    expect(isLocalhost()).toBe(true);
  });

  it('should return true for 127.0.0.1', () => {
    delete window.location;
    window.location = { hostname: '127.0.0.1' };
    expect(isLocalhost()).toBe(true);
  });

  it('should return false for other hostnames', () => {
    delete window.location;
    window.location = { hostname: 'example.com' };
    expect(isLocalhost()).toBe(false);
  });
});

describe('register function', () => {
  it('should register service worker when not on localhost', () => {
    delete window.location;
    window.location = { hostname: 'example.com', href: 'https://example.com' };
    const config = { onSuccess: jest.fn() };
    const registerValidSW = jest.fn();
    jest.spyOn(navigator.serviceWorker, 'register').mockResolvedValue({
      onupdatefound: jest.fn(),
      installing: { onstatechange: jest.fn() },
    });
    jest.spyOn(console, 'log').mockImplementation(() => {});
    register(config);
    expect(registerValidSW).toHaveBeenCalledTimes(1);
  });

  it('should check for valid service worker when on localhost', () => {
    delete window.location;
    window.location = { hostname: 'localhost', href: 'https://localhost' };
    const config = { onSuccess: jest.fn() };
    const checkValidServiceWorker = jest.fn();
    jest.spyOn(navigator.serviceWorker, 'ready').mockResolvedValue({
      then: jest.fn(),
    });
    jest.spyOn(console, 'log').mockImplementation(() => {});
    register(config);
    expect(checkValidServiceWorker).toHaveBeenCalledTimes(1);
  });

  it('should not register service worker when PUBLIC_URL is on a different origin', () => {
    delete window.location;
    window.location = { hostname: 'example.com', href: 'https://example.com', origin: 'https://example.com' };
    const config = { onSuccess: jest.fn() };
    const registerValidSW = jest.fn();
    jest.spyOn(navigator.serviceWorker, 'register').mockResolvedValue({
      onupdatefound: jest.fn(),
      installing: { onstatechange: jest.fn() },
    });
    jest.spyOn(console, 'log').mockImplementation(() => {});
    process.env.PUBLIC_URL = 'https://different-origin.com';
    register(config);
    expect(registerValidSW).not.toHaveBeenCalled();
  });
});

describe('unregister function', () => {
  it('should unregister service worker', () => {
    const unregisterServiceWorker = jest.fn();
    jest.spyOn(navigator.serviceWorker, 'ready').mockResolvedValue({
      unregister: unregisterServiceWorker,
    });
    unregister();
    expect(unregisterServiceWorker).toHaveBeenCalledTimes(1);
  });
});

describe('registerValidSW function', () => {
  it('should register service worker and call onSuccess callback', () => {
    const config = { onSuccess: jest.fn() };
    const swUrl = 'https://example.com/service-worker.js';
    const registration = {
      onupdatefound: jest.fn(),
      installing: { onstatechange: jest.fn() },
    };
    jest.spyOn(navigator.serviceWorker, 'register').mockResolvedValue(registration);
    jest.spyOn(console, 'log').mockImplementation(() => {});
    registerValidSW(swUrl, config);
    expect(config.onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should register service worker and call onUpdate callback', () => {
    const config = { onUpdate: jest.fn() };
    const swUrl = 'https://example.com/service-worker.js';
    const registration = {
      onupdatefound: jest.fn(),
      installing: { onstatechange: jest.fn() },
      controller: true,
    };
    jest.spyOn(navigator.serviceWorker, 'register').mockResolvedValue(registration);
    jest.spyOn(console, 'log').mockImplementation(() => {});
    registerValidSW(swUrl, config);
    expect(config.onUpdate).toHaveBeenCalledTimes(1);
  });
});
describe('checkValidServiceWorker function', () => {
  it('should check for valid service worker and call registerValidSW if valid', () => {
    const config = { onSuccess: jest.fn() };
    const swUrl = 'https://example.com/service-worker.js';
    const response = {
      status: 200,
      headers: {
        get: () => 'application/javascript',
      },
    };
    const registerValidSW = jest.fn();
    jest.spyOn(window, 'fetch').mockResolvedValue(response);
    checkValidServiceWorker(swUrl, config);
    expect(registerValidSW).toHaveBeenCalledTimes(1);
  });

  it('should unregister service worker if not valid', () => {
    const config = { onSuccess: jest.fn() };
    const swUrl = 'https://example.com/service-worker.js';
    const response = {
      status: 404,
    };
    const unregister = jest.fn();
    jest.spyOn(window, 'fetch').mockResolvedValue(response);
    jest.spyOn(navigator.serviceWorker, 'ready').mockResolvedValue({
      unregister,
    });
    checkValidServiceWorker(swUrl, config);
    expect(unregister).toHaveBeenCalledTimes(1);
  });

  it('should log error if no internet connection', () => {
    const config = { onSuccess: jest.fn() };
    const swUrl = 'https://example.com/service-worker.js';
    jest.spyOn(window, 'fetch').mockRejectedValue(new Error('No internet connection'));
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    checkValidServiceWorker(swUrl, config);
    expect(consoleError).toHaveBeenCalledTimes(1);
  });
});
