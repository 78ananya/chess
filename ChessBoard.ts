import React from 'react';
import ReactDOM from 'react-dom';
import { LicenseManager } from '@ag-grid-enterprise/core';
import { UMAConfig } from './config/index';
import { Routing } from './routes/route';

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
});

describe('renderApp', () => {
  it('renders Routing component correctly', () => {
    const standAloneMountPoint = document.createElement('div');
    renderApp();
    expect(ReactDOM.render).toHaveBeenCalledTimes(1);
    expect(ReactDOM.render).toHaveBeenCalledWith(<Routing />, standAloneMountPoint);
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
});

describe('bootApp', () => {
  it('calls gridLicense and renderApp correctly', () => {
    const config = { /* mock config */ };
    const gridLicenseSpy = jest.spyOn(gridLicense, 'gridLicense');
    const renderAppSpy = jest.spyOn(renderApp, 'renderApp');
    bootApp(config);
    expect(gridLicenseSpy).toHaveBeenCalledTimes(1);
    expect(gridLicenseSpy).toHaveBeenCalledWith(config);
    expect(renderAppSpy).toHaveBeenCalledTimes(1);
  });
});
