import React from 'react';
import { shallow, mount } from 'enzyme';
import { StyleCreation } from './StyleCreation';
import { CreateWizardHeader } from '../createWizardHeader';
import { StyleDetails } from './styleDetails';
import { Dashboard } from '../dashboard';

describe('StyleCreation Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<StyleCreation />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should change to view 2 on "Next" button click from view 1', () => {
    const wrapper = mount(<StyleCreation />);
    wrapper.find('button').at(0).simulate('click'); // Simulate next button click
    expect(wrapper.find('button').at(0).text()).toBe('Create'); // Check if the button text changed to 'Create'
  });

  it('should change to view 1 on "Previous" button click from view 2', () => {
    const wrapper = mount(<StyleCreation />);
    // Simulate going to view 2
    wrapper.find('button').at(0).simulate('click');
    // Simulate previous button click
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.find('button').at(0).text()).toBe('Next'); // Check if the button text is back to 'Next'
  });

  it('should show "Create Another Style" button and switch to StyleDetails on click', () => {
    const wrapper = mount(<StyleCreation />);
    wrapper.find('button').at(0).simulate('click'); // Go to view 2
    wrapper.find('button').at(2).simulate('click'); // Click "Create Another Style"
    expect(wrapper.find(StyleDetails).exists()).toBe(true); // StyleDetails component should be rendered
  });

  it('should render Dashboard on "Done" button click', () => {
    const wrapper = mount(<StyleCreation />);
    wrapper.find('button').at(0).simulate('click'); // Go to view 2
    wrapper.find('button').at(1).simulate('click'); // Click "Done"
    expect(wrapper.find(Dashboard).exists()).toBe(true); // Dashboard component should be rendered
  });

  it('should handle Reset button click', () => {
    const wrapper = mount(<StyleCreation />);
    // Simulate going to view 2
    wrapper.find('button').at(0).simulate('click');
    // Simulate Reset button click
    wrapper.find('button').at(4).simulate('click');
    // Add specific assertions to verify reset behavior if necessary
  });
});
