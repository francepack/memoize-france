import React, { Component } from 'react';
import '../Styles/index.scss';
import Category from '../Category/Category.js'
import Storage from '../Storage/Storage.js'
import mockdata from './mockdata.js'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: mockdata.codeQuestions,
      categories: []
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
        <header className="header">
          <h1 className="title">memoize</h1>
          <p className="subtitle">Find a subject to study and test your knowledge</p>
        </header>
        <section className="categories-section">
          {this.state.categories.map((category, i) => (
            <Category key={i}
                      category={category}
                      questions={this.state.questions}
            />
            ))
          }
        </section>
        <section className="storage-box"> 
          <Storage />
        </section>  
      </div>
    );
  }
}