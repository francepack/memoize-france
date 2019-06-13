import React from 'react';
import { Loading } from './Loading';
import { shallow } from 'enzyme';

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });


describe('Loading', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Loading />
    )
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
