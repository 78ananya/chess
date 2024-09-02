 it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should change to view 2 on "Next" button click from view 1', () => {
    // Click "Next" button
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    // Check if the view has changed to 2 (change in button text or other indicators)
    expect(wrapper.find('button').filterWhere(btn => btn.text() === 'Create').exists()).toBe(true);
  });

  it('should change to view 1 on "Previous" button click from view 2', () => {
    // Go to view 2
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    // Click "Previous" button
    wrapper.find('button').filterWhere(btn => btn.text() === 'Previous').simulate('click');
    // Check if the view has changed back to 1
    expect(wrapper.find('button').filterWhere(btn => btn.text() === 'Next').exists()).toBe(true);
  });

  it('should show "Create Another Style" button and switch to StyleDetails on click', () => {
    // Go to view 2
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    // Click "Create Another Style" button
    wrapper.find('button').filterWhere(btn => btn.text() === 'Create Another Style').simulate('click');
    // Check if the StyleDetails component is rendered
    expect(wrapper.find(StyleDetails).exists()).toBe(true);
  });

  it('should render Dashboard on "Done" button click', () => {
    // Go to view 2
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    // Click "Done" button
    wrapper.find('button').filterWhere(btn => btn.text() === 'Done').simulate('click');
    // Check if the Dashboard component is rendered
    expect(wrapper.find(Dashboard).exists()).toBe(true);
  });

  it('should handle Reset button click', () => {
    // Go to view 2
    wrapper.find('button').filterWhere(btn => btn.text() === 'Next').simulate('click');
    // Simulate Reset button click
    wrapper.find('button').filterWhere(btn => btn.text() === 'Reset').simulate('click');
    // Add specific assertions to verify reset behavior if necessary
  });
});
