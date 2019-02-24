import React, { Component } from 'react';
import '../Styles/index.scss';
import Category from '../Category/Category';
import Storage from '../Storage/Storage';
import mockdata from './mockdata';
import Header from '../Header/Header';

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
        <Header />
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