import React from 'react';
import { mount } from 'enzyme';
import { StyleCreation } from './StyleCreation';
import { StyleDetails } from './styleDetails';
import { Dashboard } from '../dashboard';
import { styleSteps } from '../utils/strategyMasterUtil'; // Import the mock styleSteps if necessary

describe('StyleCreation Component', () => {
  let wrapper;
  let mockNextRef;

  beforeEach(() => {
    // Mock nextRef to simulate the ref behavior
    mockNextRef = {
      current: {
        nextValidationHandler: jest.fn().mockReturnValue(true),
        prevHandler: jest.fn(),
        resetStateHandler: jest.fn(),
      },
    };

    // Mount the component and pass the mock ref
    wrapper = mount(<StyleCreation />);
    // Manually set the ref to the mock value
    wrapper.setProps({ nextRef: mockNextRef });
  });

  it('should reset state when isCreateAnotherStyle changes', () => {
    // Set isCreateAnotherStyle to true to trigger the useEffect
    wrapper.setState({ isCreateAnotherStyle: true });
    wrapper.update();

    // Check if state has been reset
    expect(wrapper.find(StyleCreation).instance().state.currentView).toBe(1);
    expect(wrapper.find(StyleCreation).instance().state.steps).toEqual(styleSteps);
    expect(wrapper.find(StyleCreation).instance().state.invStyleName).toBe("");
    expect(wrapper.find(StyleCreation).instance().state.isStyleFlowDone).toBe(false);
    expect(wrapper.find(StyleCreation).instance().state.isCreateAnotherStyle).toBe(true);
    expect(wrapper.find(StyleCreation).instance().state.invStyleDetails).toEqual([]);
  });

  it('should change to view 2 on nextFlowHandler if currentView is 1', () => {
    wrapper.setState({ currentView: 1 });
    wrapper.update();

    // Simulate nextFlowHandler call
    wrapper.find(StyleCreation).instance().nextFlowHandler();
    wrapper.update();

    // Verify state change
    expect(wrapper.find(StyleCreation).instance().state.currentView).toBe(2);
  });

  it('should change to view 3 on nextFlowHandler if currentView is 2', () => {
    wrapper.setState({ currentView: 2 });
    wrapper.update();

    // Simulate nextFlowHandler call
    wrapper.find(StyleCreation).instance().nextFlowHandler();
    wrapper.update();

    // Verify state change
    expect(wrapper.find(StyleCreation).instance().state.currentView).toBe(3);
  });

  it('should change to view 1 on previousFlowHandler if currentView is 2', () => {
    wrapper.setState({ currentView: 2 });
    wrapper.update();

    // Simulate previousFlowHandler call
    wrapper.find(StyleCreation).instance().previousFlowHandler();
    wrapper.update();

    // Verify state change
    expect(wrapper.find(StyleCreation).instance().state.currentView).toBe(1);
  });

  it('should call resetStateHandler on initialStateHandler', () => {
    // Simulate initialStateHandler call
    wrapper.find(StyleCreation).instance().initialStateHandler();
    wrapper.update();

    // Verify resetStateHandler was called
    expect(mockNextRef.current.resetStateHandler).toHaveBeenCalled();
  });

  it('should set isStyleFlowDone to true and clear dropdown on exitStyleHandler', () => {
    // Mock document query selector
    document.querySelector = jest.fn().mockReturnValue({
      value: "some value",
    });

    // Simulate exitStyleHandler call
    wrapper.find(StyleCreation).instance().exitStyleHandler();
    wrapper.update();

    // Verify state and dropdown changes
    expect(wrapper.find(StyleCreation).instance().state.isStyleFlowDone).toBe(true);
    expect(document.querySelector).toHaveBeenCalledWith("#create-new");
    expect(document.querySelector().value).toBe("");
  });

  it('should set isCreateAnotherStyle to true on createAnotherStyleHandler', () => {
    // Simulate createAnotherStyleHandler call
    wrapper.find(StyleCreation).instance().createAnotherStyleHandler();
    wrapper.update();

    // Verify state change
    expect(wrapper.find(StyleCreation).instance().state.isCreateAnotherStyle).toBe(true);
  });
});
