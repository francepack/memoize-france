import React, { Component } from 'react';
import '../Styles/index.scss';
import CategoryContainer from '../CategoryContainer/CategoryContainer';
import Header from '../Header/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      categories: [],
      storedKeys: [],
      storedQuestions: [],
      compileStorage: false,
      error: '',
      isLoading: false
    };
  }

  findAllCategories(questions) {
    return questions.reduce((acc, question) => {
      if (!acc.includes(question.category)) {
        acc.push(question.category);
      };
      return acc;
    }, []);
  }

  collectMissedQuestions = (id) => {
    if (!this.state.storedKeys.includes(id)) {
      this.state.storedKeys.push(id);
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
    this.toggleCompileStorage();
  }

  toggleCompileStorage() {
    this.setState({ compileStorage: true });
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })
    try {
      const response = await fetch('http://memoize-datasets.herokuapp.com/api/v1/MFcodeQuestions');
      const questionData = await response.json();
      const questions = questionData.MFcodeQuestions;
      const categories = this.findAllCategories(questions);
      this.setState({ questions: questions, categories: categories, isLoading: false });
    } catch(error) {
      this.setState({ error: error.message, isLoading: false });
    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <section>
          <CategoryContainer 
            categories={this.state.categories}
            questions={this.state.questions}
            collectMissedQuestions={this.collectMissedQuestions}
          />
        </section> 
        <section> 
          {this.state.compileStorage &&
          <CategoryContainer 
            storage={this.state.storedQuestions}
            collectMissedQuestions={this.collectMissedQuestions}
          />
          }
        </section>   
      </div>
    );
  }
}