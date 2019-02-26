import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const toggleDirections = jest.fn();

describe('Header', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Header />
    )
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default states', () => {
    expect(wrapper.state()).toEqual({
      displayDirections: false
    });
  });

  it('should update displayDirections state when toggleDirections is invoked', () => {
    expect(wrapper.state('displayDirections')).toEqual(false);
    wrapper.instance().toggleDirections();
    expect(wrapper.state('displayDirections')).toEqual(true);
  });

  it('should invoke toggleDirections when the directions button is clicked', () => {
    wrapper.find('.direction-btn').simulate('click', { preventDefault: () => {}});
    expect(toggleDirections).toBeCalled(); 
  });

});  