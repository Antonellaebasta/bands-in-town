import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import SelectCity, { Select } from './SelectCity';

configure({ adapter: new Adapter() });

const events = [
  {
    id: 1,
    venue: {
      name: "Event 1",
      city: "Berlin",
      country: "Germany"
    },
  },
  {
    id: 2,
    venue: {
      name: "Event 2",
      city: "Las Vegas",
      country: "USA"
    },
  },
  {
    id: 3,
    venue: {
      name: "Event 3",
      city: "Las Vegas",
      country: "USA"
    },
  },
  {
    id: 4,
    venue: {
      name: "Event 4",
      city: "Rome",
      country: "Italy"
    },
  }
];
function setup(addedProps = {}, render = shallow) {
  const props = {
    events,
    ...addedProps
  };
  return render(<SelectCity {...props} />);
}

describe('<SelectCity/> shallow rendering', () => {
  it('should render correctly', () => {
    const wrapper = setup();

    expect(wrapper.find(Select).length).toBe(1);
  });
  it('should have a <p> with the correct text', () => {
    const wrapper = setup();

    expect(wrapper.find('p').text()).toBe('Filter by City:');
  });
  it('should show as many <option> as the number of the unique cities in the props events', () => {
    const wrapper = setup();

    expect(wrapper.find(Select)).toBeDefined();
    expect(wrapper.find('option').length).toBe(events.length);
  });
  it('should show All as first selected option', () => {
    const wrapper = setup();
    const defaultOptionSelected = wrapper.find(Select).children().first();

    expect(defaultOptionSelected.text()).toBe('All');
    expect(defaultOptionSelected.props().value).toEqual("");
  });
  it('should update the city selected onChange', () => {
    const handleSelectChange = jest.fn();
    const value = 'berlin';
    const wrapper = setup({ handleSelectCity: handleSelectChange});

    expect(wrapper.find(Select).length).toBe(1);
    wrapper.find(Select).simulate('change', {target: { value }});
    expect(handleSelectChange).toHaveBeenCalledTimes(1);
    expect(handleSelectChange).toBeCalledWith(value);
  })
});