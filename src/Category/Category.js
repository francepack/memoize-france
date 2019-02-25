import React, { Component } from 'react';
import Control from '../Control/Control';
import Question from '../Question/Question';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryQuestions: props.questions.filter(question => {
       return question.category === this.props.category
      }),
      answeredQuestions: [],
      selectedQuestion: {},
      questionCount: 0,
      questionMisses: 0,
      displayQuestion: false
    }
  }

  fireQuestion = () => {
    // console.log(this.props)
    this.setState({
      selectedQuestion: this.state.categoryQuestions[this.state.questionCount]
    })
    this.state.questionCount++;
    console.log(this.state.selectedQuestion)
    this.toggleShowQuestion()
  }

  toggleShowQuestion = () => {
    this.setState({ displayQuestion: !this.state.displayQuestion })
  }

  evaluateQuestion = () => {

  }

  render() {
    // let questionCount = 0;
    // let questionMisses = 0;
    const totalQuestions = this.state.categoryQuestions.length
    let score = `You've completed ${this.state.questionCount}/${totalQuestions} questions in this category.`
    let misses = `You've missed ${this.state.questionMisses} questions.`

    return(
      <article className="category-box">
        <h2> {this.props.category} </h2>
        <section className="category-stats">
          <p>{score}</p>
          <p>{misses}</p>
        </section>
        <Control 
          questionPool={this.state.categoryQuestions}
          fireQuestion={this.fireQuestion}
        />
        <Question 
          displayQuestion={this.state.displayQuestion}
          selectedQuestion={this.state.selectedQuestion}
          toggleQuestion={this.toggleShowQuestion}
        />  
      </article> 
    )
  }
}