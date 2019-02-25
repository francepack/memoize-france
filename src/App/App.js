import React, { Component } from 'react';
import '../Styles/index.scss';
import Category from '../Category/Category';
import Storage from '../Storage/Storage';
import mockdata from './mockdata';
import Header from '../Header/Header';

export default class App extends Component {
  constructor() {
    super();

    let storedQuestions = [];

    this.state = {
      questions: mockdata.codeQuestions,
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
    // this.storeLocally(obj);
    this.storeLocally(obj)
    this.state.missedQuestions.push(obj)
    this.setState({ missedQuestions: this.state.missedQuestions });
    console.log(this.state.missedQuestions);
  }

  refreshQuiz() {}

  storeLocally(obj) {
    // try 1
    // let questionToStore = JSON.stringify(obj);
    // console.log(questionToStore)
    // this.storedQuestions = this.storedQuestions.push(questionToStore);
    // try 2
    // this.storedQuestions = this.storedQuestions.push(obj)
    // let JSONify = JSON.stringify(this.sortedQuestions)
    // localStorage.setItem('missedQuestions', JSONify);
    // try 3
    // localStorage.setItem('missedQuestions', JSON.stringify(array))
    // try 4
    // localStorage.setItem('missedQuestions', JSON.stringify(obj))
    console.log(obj)
  } 

  getFromLocalStorage() {}

  componentDidMount() {
    {this.findAllCategories()}
  //   fetch('url')
  //     .then(response => response.json())
  //     .then(questions => this.setState({ questions: }))
  //     .then(() => {this.findAllCategories()})
  //     .catch(err => console.log('music error', err))
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