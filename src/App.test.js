import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import BandSearch from './components/BandSearch';
import App, {Title} from './App';

configure({ adapter: new Adapter() });

describe('<App/> shallow rendering', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<App/>);

    expect(wrapper.find(Title).text()).toBe('Search your bands in town');
    expect(wrapper.find(BandSearch).length).toBe(1);
  });
});
