import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App'; // Replace with your actual component
import { LicenseManager } from '@ag-grid-enterprise/core';

configure({ adapter: new Adapter() });

// Mock the LicenseManager for testing
jest.mock('@ag-grid-enterprise/core', () => ({
  LicenseManager: {
    setLicenseKey: jest.fn(),
  },
}));

// Mock the loadConfig function (if applicable)
jest.mock('./yourModule', () => ({
  loadConfig: jest.fn(),
}));

describe('App Component', () => {
  it('should retrieve license key correctly', () => {
    const config = { REACT_APP_AG_GRID_KEY: 'testKey1' };
    process.env.REACT_APP_AG_GRID_KEY = 'testKey2';

    const wrapper = shallow(<App config={config} />);

    // Assert that the correct license key is set
    expect(LicenseManager.setLicenseKey).toHaveBeenCalledWith('testKey1');
  });

  it('should call loadConfig function', () => {
    const wrapper = mount(<App />);

    // Assert that loadConfig was called
    expect(loadConfig).toHaveBeenCalled();
  });
});
