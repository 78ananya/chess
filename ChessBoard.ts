describe('gridLicense', () => {
  it('sets license key when config.REACT_APP_AG_GRID_KEY is present', () => {
    const config = { REACT_APP_AG_GRID_KEY: 'dummy-key' };
    gridLicense(config);
    expect(LicenseManager.getLicenseKey()).toBe('dummy-key');
  });

  it('sets license key when process.env.REACT_APP_AG_GRID_KEY is present', () => {
    process.env.REACT_APP_AG_GRID_KEY = 'dummy-key';
    const config = {};
    gridLicense(config);
    expect(LicenseManager.getLicenseKey()).toBe('dummy-key');
  });

  it('does not set license key when both are absent', () => {
    const config = {};
    gridLicense(config);
    expect(LicenseManager.getLicenseKey()).toBeUndefined();
  });

  it('does not set license key when config is empty', () => {
    const config = {};
    gridLicense(config);
    expect(LicenseManager.getLicenseKey()).toBeUndefined();
  });
});

describe('renderApp', () => {
  it('renders Routing component correctly', () => {
    const standAloneMountPoint = document.createElement('div');
    renderApp();
    expect(ReactDOM.render).toHaveBeenCalledTimes(1);
    expect(ReactDOM.render).toHaveBeenCalledWith(<Routing />, standAloneMountPoint);
  });

  it('renders a mock Routing component correctly', () => {
    const MockRouting = () => <div>Mock Routing Component</div>;
    const standAloneMountPoint = document.createElement('div');
    renderApp(MockRouting);
    expect(ReactDOM.render).toHaveBeenCalledTimes(1);
    expect(ReactDOM.render).toHaveBeenCalledWith(<MockRouting />, standAloneMountPoint);
  });
});

describe('loadConfig', () => {
  it('calls bootApp with correct config', async () => {
    const config = { /* mock config */ };
    const bootAppSpy = jest.spyOn(bootApp, 'bootApp');
    await loadConfig();
    expect(bootAppSpy).toHaveBeenCalledTimes(1);
    expect(bootAppSpy).toHaveBeenCalledWith(config);
  });

  it('calls bootApp with a successful config load', async () => {
    const config = { /* mock config */ };
    const bootAppSpy = jest.spyOn(bootApp, 'bootApp');
    await loadConfig();
    expect(bootAppSpy).toHaveBeenCalledTimes(1);
    expect(bootAppSpy).toHaveBeenCalledWith(config);
  });
  it('handles errors when gridLicense and renderApp fail', () => {
  const config = { /* mock config */ };
  const gridLicenseSpy = jest.spyOn(gridLicense, 'gridLicense');
  const renderAppSpy = jest.spyOn(renderApp, 'renderApp');
  gridLicenseSpy.mockImplementation(() => { throw new Error('Grid license failed'); });
  renderAppSpy.mockImplementation(() => { throw new Error('Render app failed'); });
  expect(() => bootApp(config)).toThrowError('Grid license failed');
  expect(() => bootApp(config)).toThrowError('Render app failed');
});
});
