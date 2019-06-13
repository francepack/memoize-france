import React, { Component } from 'react';
import '../Styles/index.scss';
import CategoryContainer from '../CategoryContainer/CategoryContainer';
import Header from '../Header/Header';
import { Loading } from '../Loading/Loading';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      storedKeys: [],
      error: '',
      isLoading: false
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })
    try {
      const response = await fetch('http://memoize-datasets.herokuapp.com/api/v1/MFcodeQuestions');
      const questionData = await response.json();
      const questions = questionData.MFcodeQuestions;
      this.setState({ questions: questions });
    } catch(error) {
      this.setState({ error: error.message });
    };
    const storage = await this.retrieveLocalStorage();
    this.setState({ storedKeys: storage, isLoading: false });
  }

  collectMissedQuestions = (id) => {
    console.log(id)
    if (!this.state.storedKeys.includes(id)) {
      this.setState({ storedKeys: [...this.state.storedKeys, id] });
      this.storeLocally(this.state.storedKeys);
    };
  }

  storeLocally(arr) {
    localStorage.setItem('missedQuestions', JSON.stringify(arr));
    this.retrieveLocalStorage();
  } 

  retrieveLocalStorage() {
    return JSON.parse(localStorage.getItem('missedQuestions'));
  }

  findStoredQuestions() {
    return this.state.storedKeys.map(id => {
      return this.state.questions.find(question => question.id === id)
    });
  }

  render() {
    return (
      <div className='app'>
        <Header />
        <main>
          {this.state.isLoading &&
            <Loading />
          }  
          <CategoryContainer 
            questions={this.state.questions}
            collectMissedQuestions={this.collectMissedQuestions}
          />
          {this.state.storedKeys &&
            <CategoryContainer 
              storage={this.findStoredQuestions()}
              collectMissedQuestions={this.collectMissedQuestions}
            />
          }
        </main>
      </div>
    );
  }
}