import React from 'react';
import Category from './Category';
import { shallow } from 'enzyme';

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const mockData= [ {id:'1', category:'People', question:'Who is it?', options:['me', 'you', 'neither', 'both'], answer:'you', link:'http://plcaeholder.com'}, {id:'2', category:'Age', question:'How old is my nephew?', options:['1', '2', '3', '4'], answer:'3', link:'http://plcaeholder.com'}, {id:'3', category:'Denver', question:'What is the best place to eat in Denver?', options:['Casa Bonita', 'Chipotle', 'Denver Teds', 'Birdcall'], answer:'Birdcall', link:'http://plcaeholder.com'} ]

describe('Category', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Category />
    )
  });

  it('should match snapshot', () => {
    wrapper.setState({'categoryQuestions': mockData});
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default states', () => {
    expect(wrapper.state()).toEqual({
      categoryQuestions: [], 
      selectedQuestion: {}, 
      questionCount: 0,
      incorrectCount: 0,
      correctCount: 0,
      currentQuestionCorrect: false,
      displayQuestion: false,
      showFeedback: false
    });
  });

  it('should update selectedQuestion state when fireQuestion is invoked', () => {
    wrapper.setState({'categoryQuestions': mockData});
    expect(wrapper.state('selectedQuestion')).toEqual({});
    wrapper.instance().fireQuestion();
    expect(wrapper.state('selectedQuestion')).toHaveLength(1);
    expect(wrapper.state('selectedQuestion')).toEqual({id:'1', category:'People', question:'Who is it?', options:['me', 'you', 'neither', 'both'], answer:'you', link:'http://plcaeholder.com'});
  });

  it('should invoke fireQuestion when the Fire Question button is clicked', () => {
    wrapper.find('.question-btn').simulate('click', { preventDefault: () => {}});
    expect(fireQuestion).toBeCalled(); 
  });

  it('should update displayQuestion state when toggleShowQuestion is invoked', () => {
    expect(wrapper.state('displayQuestion')).toEqual(false);
    wrapper.instance().toggleShowQuestion();
    expect(wrapper.state('displayQuestion')).toEqual(true);
  });

  it('should update showFeedback state when toggleShowFeedback is invoked', () => {
    expect(wrapper.state('showFeedback')).toEqual(false);
    wrapper.instance().toggleShowFeedback();
    expect(wrapper.state('showFeedback')).toEqual(true);
  });

});  

