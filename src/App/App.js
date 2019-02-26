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
      missedQuestions: [],
      storedQuestions: []
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
    // this.state.missedQuestions.push(obj)
    // this.setState({ missedQuestions: this.state.missedQuestions });
    console.log(this.state.storedQuestions)
    if (!this.state.storedQuestions.includes(obj)) {
      this.state.storedQuestions.push(obj)
      this.storeLocally(this.state.storedQuestions)
    }
    // this.state.missedQuestions
    console.log(this.state.storedQuestions)
  }

  refreshQuiz() {}

  storeLocally(arr) {
    localStorage.setItem('missedQuestions', JSON.stringify(arr));
    this.retrieveLocalStorage();
    console.log(this.state.storedQuestions);
  } 

  retrieveLocalStorage = () => {
    let storage = JSON.parse(localStorage.getItem('missedQuestions'));
    // let pushStorage = storage.map(storedQuestion => {
    //   this.state.storedQuestions.push(storedQuestion)
    // })
    if (storage) {
      this.setState({ storedQuestions: storage })
    }
    console.log(this.state.storedQuestions)
  }

  componentDidMount() {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/MFcodeQuestions')
      .then(response => response.json())
      .then(questions => this.setState({ questions: questions.MFcodeQuestions }))
      .then(() => {this.findAllCategories()})
      .catch(err => console.log('fetch error', err));
    this.retrieveLocalStorage();
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
            getQuestions={this.retrieveLocalStorage}
          />
        </section>    
      </div>
    );
  }
}