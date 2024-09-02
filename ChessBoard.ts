describe('isLocalhost', () => {
  it('should return true for localhost hostname', () => {
    // Setup window.location.hostname to 'localhost'
    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'localhost',
      },
      writable: true,
    });

    expect(isLocalhost()).toBe(true);
  });

  it('should return false for non-localhost hostname', () => {
    // Setup window.location.hostname to something other than 'localhost'
    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'example.com',
      },
      writable: true,
    });

    expect(isLocalhost()).toBe(false);
  });
});

describe('register', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    global.navigator.serviceWorker.register.mockClear();
    global.fetch.mockClear();
    console.error = jest.fn(); // Suppress console.error for tests
  });

  it('should register service worker if in production', () => {
    process.env.NODE_ENV = 'production';
    process.env.PUBLIC_URL = 'http://localhost:3000';
    
    // Setup window.location.href for testing
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost:3000',
      },
      writable: true,
    });

    const mockSWUrl = 'http://localhost:3000/service-worker.js';
    global.fetch.mockResolvedValue({
      headers: new Map([['content-type', 'application/javascript']]),
      status: 200,
    });

    register({
      onUpdate: jest.fn(),
      onSuccess: jest.fn(),
    });

    expect(global.navigator.serviceWorker.register).toHaveBeenCalledWith(mockSWUrl);
  });

  it('should handle service worker registration error', () => {
    process.env.NODE_ENV = 'production';
    process.env.PUBLIC_URL = 'http://localhost:3000';
    
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost:3000',
      },
      writable: true,
    });

    global.fetch.mockRejectedValue(new Error('Network error'));

    register({
      onUpdate: jest.fn(),
      onSuccess: jest.fn(),
    });

    expect(console.error).toHaveBeenCalledWith('Error during service worker registration:', expect.any(Error));
  });
});

describe('unregister', () => {
  it('should unregister service worker', async () => {
    // Setup navigator.serviceWorker.ready to resolve with a mock object
    global.navigator.serviceWorker.ready = Promise.resolve({
      unregister: jest.fn().mockResolvedValue(true),
    });

    await unregister();

    expect(global.navigator.serviceWorker.ready).toBeDefined();
    expect(global.navigator.serviceWorker.ready.then).toHaveBeenCalledWith(expect.any(Function));
  });
});
