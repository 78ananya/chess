import React from 'react';
import { shallow } from 'enzyme';
import { StyleCreation } from './StyleCreation'; // Update the import path if needed

describe('StyleCreation', () => {
  it('renders with initial state', () => {
    const wrapper = shallow(<StyleCreation />);
    expect(wrapper.find('Step1')).toHaveLength(1);
    // Add more assertions based on the initial state
  });

  it('navigates to the next step', () => {
    const wrapper = shallow(<StyleCreation />);
    const nextButton = wrapper.find('button').at(0);
    nextButton.simulate('click');
    wrapper.update();
    expect(wrapper.find('Step2')).toHaveLength(1);
    // Add more assertions based on the new state
  });

  it('navigates to the previous step', () => {
    const wrapper = shallow(<StyleCreation />);
    const nextButton = wrapper.find('button').at(0);
    nextButton.simulate('click');
    wrapper.update();
    const previousButton = wrapper.find('button').at(1);
    previousButton.simulate('click');
    wrapper.update();
    expect(wrapper.find('Step1')).toHaveLength(1);
    // Add more assertions based on the new state
  });

  it('calls the `onStepChange` callback when navigating to the next step', () => {
    const onStepChange = jest.fn();
    const wrapper = shallow(<StyleCreation onStepChange={onStepChange} />);
    const nextButton = wrapper.find('button').at(0);
    nextButton.simulate('click');
    expect(onStepChange).toHaveBeenCalledTimes(1);
  });

  it('calls the `onStepChange` callback when navigating to the previous step', () => {
    const onStepChange = jest.fn();
    const wrapper = shallow(<StyleCreation onStepChange={onStepChange} />);
    const nextButton = wrapper.find('button').at(0);
    nextButton.simulate('click');
    wrapper.update();
    const previousButton = wrapper.find('button').at(1);
    previousButton.simulate('click');
    expect(onStepChange).toHaveBeenCalledTimes(2);
  });

  // Add more test cases as needed
});
