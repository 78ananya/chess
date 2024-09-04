import React from 'react';
import { LicenseManager } from '@ag-grid-enterprise/core';
import { UMAConfig } from './config/index';
import gridLicense from './yourFile'; // Assuming gridLicense is in a separate file

describe('gridLicense', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set license key when provided', () => {
    const config = { REACT_APP_AG_GRID_KEY: 'testKey' };
    LicenseManager.setLicenseKey = jest.fn();

    gridLicense(config);

    expect(LicenseManager.setLicenseKey).toHaveBeenCalledWith('testKey');
  });

  it('should use environment variable if license key is not provided', () => {
    const config = {};
    process.env.REACT_APP_AG_GRID_KEY = 'envKey';
    LicenseManager.setLicenseKey = jest.fn();

    gridLicense(config);

    expect(LicenseManager.setLicenseKey).toHaveBeenCalledWith('envKey');
  });

  it('should not set license key if license is null or undefined', () => {
    const config = { REACT_APP_AG_GRID_KEY: null };
    LicenseManager.setLicenseKey = jest.fn();

    gridLicense(config);

    expect(LicenseManager.setLicenseKey).not.toHaveBeenCalled();
  });
});
import loadConfig from './yourFile'; // Assuming loadConfig is in a separate file

describe('loadConfig', () => {
  it('should call the function', () => {
    loadConfig = jest.fn();

    loadConfig();

    expect(loadConfig).toHaveBeenCalled();
  });
  

  // Add more test cases based on the expected behavior of loadConfig
  // For example, if it's an asynchronous function, you might need to use async/await or promises.
});
import { UMAConfig } from './config/index'; // Replace with the actual path

describe('UMAConfig', () => {
  it('should be an object', () => {
    expect(UMAConfig).toBeInstanceOf(Object);
  });

  it('should have expected properties', () => {
    expect(UMAConfig).toHaveProperty('property1'); // Replace with actual property names
    expect(UMAConfig).toHaveProperty('property2');
  });

  it('should have correct values for properties', () => {
    expect(UMAConfig.property1).toBe('expectedValue1');
    expect(UMAConfig.property2).toEqual(expectedValue2);
  });
});

