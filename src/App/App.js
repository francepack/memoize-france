import React, { Component } from 'react';
import '../Styles/index.scss';
import Category from '../Category/Category';
import Storage from '../Storage/Storage';
import Header from '../Header/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      categories: [],
      missedQuestions: []
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

  collectMissedQuestions = (obj) => {
    this.state.missedQuestions.push(obj)
    this.setState({ missedQuestions: this.state.missedQuestions });
    this.storeLocally(this.state.missedQuestions)
  }

  refreshQuiz() {}

  storeLocally(arr) {
    localStorage.setItem('missedQuestions', JSON.stringify(arr))
  } 

  getFromLocalStorage() {}

  componentDidMount() {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/MFcodeQuestions')
      .then(response => response.json())
      .then(questions => this.setState({ questions: questions.MFcodeQuestions }))
      .then(() => {this.findAllCategories()})
      .catch(err => console.log('music error', err))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <section className="categories-section">
          {this.state.categories.map((category, i) => (
            <Category key={i}
                      category={category}
                      questions={this.state.questions}
                      collectMissedQuestions={this.collectMissedQuestions}
            />
          ))}
        </section>
        <section className="storage-box"> 
          <Storage 
            missedQuestions={this.state.missedQuestions}
          />
        </section>    
      </div>
    );
  }
}