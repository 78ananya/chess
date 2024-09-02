import React from 'react';
import { mount } from 'enzyme';
import { StyleCreation } from './StyleCreation';
import { StyleDetails } from './styleDetails';
import { Dashboard } from '../dashboard';
import { StyleDetailsContext } from './styleDetailsContext';

describe('StyleCreation Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<StyleCreation />);
  });

  it('should reset to initial state when isCreateAnotherStyle changes', () => {
    // Simulate state change to trigger useEffect
    wrapper.setState({ isCreateAnotherStyle: true });
    // Verify state is reset
    expect(wrapper.find(StyleCreation).state('currentView')).toBe(1);
    expect(wrapper.find(StyleCreation).state('steps')).toEqual(styleSteps); // Assuming styleSteps is imported or defined
    expect(wrapper.find(StyleCreation).state('invStyleName')).toBe('');
    expect(wrapper.find(StyleCreation).state('isStyleFlowDone')).toBe(false);
    expect(wrapper.find(StyleCreation).state('isCreateAnotherStyle')).toBe(true);
    expect(wrapper.find(StyleCreation).state('invStyleDetails')).toEqual([]);
  });

  it('should handle nextFlowHandler correctly', () => {
    // Simulate view 1
    wrapper.setState({ currentView: 1 });
    // Simulate next button click
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    // Verify state change
    expect(wrapper.find(StyleCreation).state('currentView')).toBe(2);
    // Simulate view 2
    wrapper.setState({ currentView: 2 });
    // Simulate next button click again
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    // Verify state change
    expect(wrapper.find(StyleCreation).state('currentView')).toBe(3);
  });

  it('should handle previousFlowHandler correctly', () => {
    // Simulate view 2
    wrapper.setState({ currentView: 2 });
    // Simulate previous button click
    wrapper.find('button').filterWhere(btn => btn.text() === 'Previous').simulate('click');
    // Verify state change
    expect(wrapper.find(StyleCreation).state('currentView')).toBe(1);
  });

  it('should handle goToInStyleDetails correctly', () => {
    // Simulate clicking "Create Another Style" button
    wrapper.find('button').filterWhere(btn => btn.text() === 'Create Another Style').simulate('click');
    // Verify state change
    expect(wrapper.find(StyleCreation).state('currentView')).toBe(1);
    expect(wrapper.find(StyleDetails).exists()).toBe(true);
  });

  it('should handle exitStyleHandler correctly', () => {
    // Simulate clicking "Done" button
    wrapper.find('button').filterWhere(btn => btn.text() === 'Done').simulate('click');
    // Verify state change
    expect(wrapper.find(StyleCreation).state('isStyleFlowDone')).toBe(true);
    expect(wrapper.find(Dashboard).exists()).toBe(true);
  });

  it('should handle createAnotherStyleHandler correctly', () => {
    // Simulate clicking "Create Another Style" button
    wrapper.find('button').filterWhere(btn => btn.text() === 'Create Another Style').simulate('click');
    // Verify state change
    expect(wrapper.find(StyleCreation).state('isCreateAnotherStyle')).toBe(true);
    expect(wrapper.find(StyleDetailsContext).exists()).toBe(true);
  });
});
