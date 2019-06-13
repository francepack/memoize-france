import React, { Component } from 'react';
import '../Styles/index.scss';
import CategoryContainer from '../CategoryContainer/CategoryContainer';
import Header from '../Header/Header';
import { Loading } from '../Loading/Loading'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      categories: [],
      storedKeys: [],
      storedQuestions: [],
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
      this.setState({ questions: questions, isLoading: false });
    } catch(error) {
      this.setState({ error: error.message, isLoading: false });
    };
    await this.retrieveLocalStorage();
  }

  collectMissedQuestions = (id) => {
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
    let storage = JSON.parse(localStorage.getItem('missedQuestions'));
    if (storage !== null) {
      this.setState({ storedKeys: storage });
      let gatheredQuestions = this.state.storedKeys.map(id => {
        return this.state.questions.find(question => question.id === id);
      });
      this.setState({ storedQuestions: gatheredQuestions });
    };
  }

  render() {
    return (
      <div className='app'>
        <Header />
        <main>
          {this.state.isLoading &&
            <Loading />
          }  
          {!this.state.loading &&
            <div>
              <CategoryContainer 
                categories={this.state.categories}
                questions={this.state.questions}
                collectMissedQuestions={this.collectMissedQuestions}
              />
              <CategoryContainer 
                storage={this.state.storedQuestions}
                collectMissedQuestions={this.collectMissedQuestions}
              />
            </div>
          }
        </main>
      </div>
    );
  }
}