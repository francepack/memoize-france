import React from 'react';
import Feedback from './Feedback';
import { shallow } from 'enzyme';

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
// const mockQuestion= {id:'1', category:'People', question:'Who is it?', options:['me', 'you', 'neither', 'both'], answer:'you', link:'http://plcaeholder.com'};
const toggleShowFeedback= jest.fn();

describe('Feedback', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Feedback 
        toggleFeedback={toggleShowFeedback}
      />
    )
  });

  it('should match snapshot', () => {
    wrapper.setProps({ showFeedback: true, questionFeedback: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    wrapper.setProps({ showFeedback: true, questionFeedback: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke toggleShowFeedback when the return button is clicked', () => {
    wrapper.setProps({ showFeedback: true, questionFeedback: true });
    wrapper.find('.next-btn').simulate('click', { preventDefault: () => {}});
    expect(toggleShowFeedback).toBeCalled(); 
  });

});  