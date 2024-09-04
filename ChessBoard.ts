describe('DashboardMenuTabs', () => {
  it('renders correctly with initial props', () => {
    const menuTabs = [
      { title: 'Tab 1', number: 1 },
      { title: 'Tab 2', number: 2 }
    ];

    const wrapper = shallow(<DashboardMenuTabs menuTabs={menuTabs} />);

    expect(wrapper).toMatchSnapshot();
  });
  it('updates selectedTab when a tab is clicked', () => {
  const menuTabs = [
    { title: 'Tab 1', number: 1 },
    { title: 'Tab 2', number: 2 }
  ];

  const wrapper = shallow(<DashboardMenuTabs menuTabs={menuTabs} />);

  // Simulate clicking on the first tab
  wrapper.find('button').first().simulate('click');

  // Assert that selectedTab state is updated
  expect(wrapper.state('selectedTab')).toBe(1);
});
it('updates selectedSmaSubTab when a sub-menu tab is clicked', () => {
  // Assuming your component has a structure to handle sub-menu tabs
  const wrapper = shallow(<DashboardMenuTabs /* ... */ />);

  // Simulate clicking on a sub-menu tab
  wrapper.find('button.sub-menu-tab').first().simulate('click');

  // Assert that selectedSmaSubTab state is updated
  expect(wrapper.state('selectedSmaSubTab')).toBe(/* expected value */);
});
it('updates selectedManagerSubTab when a manager sub-menu tab is clicked', () => {
  // Assuming your component has a structure to handle manager sub-menu tabs
  const wrapper = shallow(<DashboardMenuTabs /* ... */ />);

  // Simulate clicking on a manager sub-menu tab
  wrapper.find('button.manager-sub-menu-tab').first().simulate('click');

  // Assert that selectedManagerSubTab state is updated
  expect(wrapper.state('selectedManagerSubTab')).toBe(/* expected value */);
});

});
