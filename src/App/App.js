import React, { Component } from 'react';
import '../Styles/index.scss';
import Category from '../Category/Category';
import Header from '../Header/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      categories: [],
      storedKeys: [],
      storedQuestions: [],
      compileStorage: false
    }
  }

  findAllCategories = () => {
    let allCategories = this.state.questions.reduce((acc, question) => {
      if (!acc.includes(question.category)) {
        acc.push(question.category);
      }
      return acc;
    }, [])
    this.setState({
      categories: allCategories
    })
  }

  collectMissedQuestions = (id) => {
    console.log(this.state.storedKeys)
    if (!this.state.storedKeys.includes(id)) {
      this.state.storedKeys.push(id)
      this.storeLocally(this.state.storedKeys)
    }
    console.log(this.state.storedKeys)
  }

  storeLocally(arr) {
    localStorage.setItem('missedQuestions', JSON.stringify(arr));
    this.retrieveLocalStorage();
    console.log(this.state.storedKeys);
  } 

  retrieveLocalStorage = () => {
    let storage = JSON.parse(localStorage.getItem('missedQuestions'));
    console.log(storage)
    if (storage !== null) {
      this.state.storedKeys = storage;
      this.setState({ storedKeys: this.state.storedKeys })
      let gatheredQuestions = this.state.storedKeys.map(id => {
        return this.state.questions.find(question => {
          if (question.id === id) {
            return question;
          }
        })
      })
      console.log(gatheredQuestions)
      this.setState({ storedQuestions: gatheredQuestions})
      console.log(this.state.storedQuestions)
    }
    this.toggleCompileStorage()
  }

  toggleCompileStorage() {
    this.setState({ compileStorage: true })
  }

  componentDidMount() {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/MFcodeQuestions')
      .then(response => response.json())
      .then(questions => this.setState({ questions: questions.MFcodeQuestions }))
      .then(() => {this.findAllCategories()})
      .then(() => {this.retrieveLocalStorage()})
      .catch(err => console.log('fetch error', err));
  }

  render() {
    return (
      <div className="App">
        <Header />
        <section className="categories-section">
          {this.state.categories.map((category, i) => (
            <Category 
              key={i}
              category={category}
              questions={this.state.questions}
              collectMissedQuestions={this.collectMissedQuestions}
            />
          ))}
        </section> 
        <section className="storage-section"> 
          {this.state.compileStorage &&
          <Category 
            questions={this.state.questions}
            storage={this.state.storedQuestions}
            collectMissedQuestions={this.collectMissedQuestions}
          />
          }
        </section>   
      </div>
    );
  }
}