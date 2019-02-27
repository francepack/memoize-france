import React from 'react';
import Category from './Category';
import { shallow } from 'enzyme';

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

//made all the categories the same vale for these tests
const mockData= [ {id:'1', category:'People', question:'Who is it?', options:['me', 'you', 'neither', 'both'], answer:'you', link:'http://plcaeholder.com'}, {id:'2', category:'People', question:'How old is my nephew?', options:['1', '2', '3', '4'], answer:'3', link:'http://plcaeholder.com'}, {id:'3', category:'People', question:'What is the best place to eat in Denver?', options:['Casa Bonita', 'Chipotle', 'Denver Teds', 'Birdcall'], answer:'Birdcall', link:'http://plcaeholder.com'} ];
const mockCategories= [ 'People', 'Age', 'Denver' ];
const showQuestion = jest.fn();
const toggleShowQuestion = jest.fn();
const toggleShowFeedback = jest.fn();
const endQuestion = jest.fn();


describe('Category', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Category
        category={mockCategories}
        questions={mockData}
      />
    )
  });

  it('should match snapshot', () => {
    wrapper.setState({'categoryQuestions': mockData});
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    wrapper.setState({'categoryQuestions': mockData, 'questionCount': 3});
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

  it('should update selectedQuestion state when showQuestion is invoked', () => {
    wrapper.setState({'categoryQuestions': mockData});
    expect(wrapper.state('selectedQuestion')).toEqual({});
    wrapper.instance().showQuestion();
    expect(wrapper.state('selectedQuestion')).toEqual({id:'1', category:'People', question:'Who is it?', options:['me', 'you', 'neither', 'both'], answer:'you', link:'http://plcaeholder.com'});
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

  it('should increase the state questionCount by 1 when toggleShowFeedback is invoked twice', () => {
    expect(wrapper.state('questionCount')).toEqual(0);
    wrapper.instance().toggleShowFeedback();
    expect(wrapper.state('questionCount')).toEqual(0);
    wrapper.instance().toggleShowFeedback();
    expect(wrapper.state('questionCount')).toEqual(1);
  });

  it('should update questionCount, correctCount and incorrectCount states when refreshCategory is invoked', () => {
    wrapper.setState({'questionCount': 3, 'correctCount': 2, 'incorrectCount': 0});
    wrapper.instance().refreshCategory();
    expect(wrapper.state('questionCount')).toEqual(0);
    expect(wrapper.state('correctCount')).toEqual(0);
    expect(wrapper.state('incorrectCount')).toEqual(0);
  });

  // Test attempts kept for evaluation discussion

  // it('should invoke showQuestion when the Fire Question button is clicked', () => {
  //   wrapper.setState({'categoryQuestions': mockData, 'questionCount': 0});
  //   wrapper.find('.question-btn').simulate('click', { preventDefault: jest.fn() });
  //   expect(showQuestion).toBeCalled(); 
  // });

  // it('should invoke toggleShowQuestion and toggleShowFeedback when endQuestion is run', () => {
  //   wrapper.instance().endQuestion();
  //   expect(toggleShowQuestion).toBeCalled(); 
  //   expect(toggleShowFeedback).toBeCalled(); 
  // });

  // it('should invoke endQuestion when evaluateQuestion is called', () => {
  //   wrapper.setState({'selectedQuestion': {id:'1', category:'People', question:'Who is it?', options:['me', 'you', 'neither', 'both'], answer:'you', link:'http://plcaeholder.com'} }); 
  //   wrapper.instance().evaluateQuestion({target: {innerText: 'you'}});
  //   expect(endQuestion).toBeCalled();
  // });

  // it('shold update questionCount and correct/incorrectCount states when evaluateQuestion is invoked', () => {
  //   expect(wrapper.state('correctCount')).toEqual(0);
  //   expect(wrapper.state('incorrectCount')).toEqual(0);
  //   expect(wrapper.state('currentQuestionCorrect')).toEqual(false);
  //   wrapper.setState({'selectedQuestion': {id:'1', category:'People', question:'Who is it?', options:['me', 'you', 'neither', 'both'], answer:'you', link:'http://plcaeholder.com'});
  //   evaluateQuestion();
  //   expect(wrapper.state('correctCount')).toEqual(1);
  //   expect(wrapper.state('incorrectCount')).toEqual(0);
  //   expect(wrapper.state('currentQuestionCorrect')).toEqual(true);
  // });
});  

