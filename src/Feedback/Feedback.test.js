import React from 'react';
import Feedback from './Feedback';
import { shallow } from 'enzyme';

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe('Feedback', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Feedback />
    )
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});  