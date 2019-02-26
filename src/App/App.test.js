import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

// mockData has 3 entries, each with a unique category
const mockData= [ {id:'1', category:'People', question:'Who is it?', options:['me', 'you', 'neither', 'both'], answer:'you', link:'http://plcaeholder.com'}, {id:'2', category:'Age', question:'How old is my nephew?', options:['1', '2', '3', '4'], answer:'3', link:'http://plcaeholder.com'}, {id:'3', category:'Denver', question:'What is the best place to eat in Denver?', options:['Casa Bonita', 'Chipotle', 'Denver Teds', 'Birdcall'], answer:'Birdcall', link:'http://plcaeholder.com'} ]

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <App />
    )
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default states', () => {
    expect(wrapper.state()).toEqual({
      questions: [], 
      categories: [], 
      storedKeys: [],
      storedQuestions: [],
      compileStorage: false
    });
  });  

  it('should update categories state when findAllCategories is invoked', () => {
    wrapper.setState({'questions': mockData});
    expect(wrapper.state('categories')).toEqual([]);
    wrapper.instance().findAllCategories();
    expect(wrapper.state('categories')).toHaveLength(3);
  });

  it('should update compileStorage state when toggleCompileStorage is invoked', () => {
    expect(wrapper.state('compileStorage')).toEqual(false);
    wrapper.instance().toggleCompileStorage();
    expect(wrapper.state('compileStorage')).toEqual(true);
  });

});