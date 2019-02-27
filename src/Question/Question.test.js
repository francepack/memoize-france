import React from 'react';
import Question from './Question';
import { shallow } from 'enzyme';

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const evaluateQuestion = jest.fn();

describe('Question', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Question 
        evaluateQuestion={evaluateQuestion}
      />
    )
    wrapper.setProps({ displayQuestion: true, selectedQuestion: {id:'1', category:'People', question:'Who is it?', options:['me', 'you', 'neither', 'both'], answer:'you', link:'http://plcaeholder.com'} });
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke evaluateQuestion when an answer is clicked', () => {
    wrapper.find('.answer').at(0).simulate('click', { preventDefault: () => {}});
    expect(evaluateQuestion).toBeCalled(); 
  });

});  