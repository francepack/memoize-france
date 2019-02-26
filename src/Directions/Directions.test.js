import React from 'react';
import Directions from './Directions';
import Header from '../Header/Header'
import { shallow } from 'enzyme';

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const toggleDirections = jest.fn();

describe('Directions', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Directions 
        toggleDirections={toggleDirections}
      />
    )
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke toggleDirections when the direction-close button is clicked', () => {
    wrapper.find('.direction-close').simulate('click', { preventDefault: () => {}});
    expect(toggleDirections).toBeCalled(); 
  });

});  