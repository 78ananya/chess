describe('StyleCreation Component', () => {
  let wrapper;

  beforeEach(() => {
    // Mount the component with mock data
    wrapper = mount(<StyleCreation />);
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should change to view 2 on "Next" button click from view 1', () => {
    // Simulate clicking the "Next" button
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    wrapper.update(); // Ensure the view has updated
    // Check if the view has changed to view 2
    expect(wrapper.find('button').filterWhere(btn => btn.text() === 'Create').exists()).toBe(true);
  });

  it('should change to view 1 on "Previous" button click from view 2', () => {
    // Simulate going to view 2
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    wrapper.update(); // Ensure the view has updated
    // Simulate clicking the "Previous" button
    wrapper.find('button').filterWhere(btn => btn.text() === 'Previous').simulate('click');
    wrapper.update(); // Ensure the view has updated
    // Check if the view has changed back to view 1
    expect(wrapper.find('button').filterWhere(btn => btn.text() === 'Next').exists()).toBe(true);
  });

  it('should show "Create Another Style" button and switch to StyleDetails on click', () => {
    // Simulate going to view 2
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    wrapper.update(); // Ensure the view has updated
    // Simulate clicking "Create Another Style" button
    wrapper.find('button').filterWhere(btn => btn.text() === 'Create Another Style').simulate('click');
    wrapper.update(); // Ensure the component has updated
    // Check if the StyleDetails component is rendered
    expect(wrapper.find(StyleDetails).exists()).toBe(true);
  });

  it('should render Dashboard on "Done" button click', () => {
    // Simulate going to view 2
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    wrapper.update(); // Ensure the view has updated
    // Simulate clicking "Done" button
    wrapper.find('button').filterWhere(btn => btn.text() === 'Done').simulate('click');
    wrapper.update(); // Ensure the component has updated
    // Check if the Dashboard component is rendered
    expect(wrapper.find(Dashboard).exists()).toBe(true);
  });

  it('should handle Reset button click', () => {
    // Simulate going to view 2
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    wrapper.update(); // Ensure the view has updated
    // Simulate Reset button click
    wrapper.find('button').filterWhere(btn => btn.text() === 'Reset').simulate('click');
    wrapper.update(); // Ensure the component has updated
    // Add specific assertions to verify reset behavior if necessary
  });
});
