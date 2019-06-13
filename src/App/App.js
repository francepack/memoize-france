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
    this.setState({ isLoading: true });
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

  retrieveLocalStorage() {
    let storage = JSON.parse(localStorage.getItem('missedQuestions'));
    if (storage) {
      return storage;
    } else {
      return [];
    }
  }

  collectMissedQuestions = async (id) => {
    if (!this.state.storedKeys.includes(id)) {
      await this.setState({ storedKeys: [...this.state.storedKeys, id] });
      this.updateLocalStore();
    };
  }

  updateLocalStore() {
    localStorage.setItem('missedQuestions', JSON.stringify(this.state.storedKeys));
  } 

  findStoredQuestions() {
    if (this.state.storedKeys) {
      return this.state.storedKeys.map(id => {
        return this.state.questions.find(question => question.id === id);
      });
    } else {
      return [];
    }
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className='app'>
        <Header />
        {isLoading && <Loading />}
        {!isLoading &&
          <main>
            <CategoryContainer 
              questions={this.state.questions}
              collectMissedQuestions={this.collectMissedQuestions}
            />
            <CategoryContainer 
              storage={this.findStoredQuestions()}
              collectMissedQuestions={this.collectMissedQuestions}
            />
          </main>
        }  
      </div>
    );
  }
}