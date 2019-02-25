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
      selectedQuestion: {},
      questionCount: 0,
      questionMisses: 0,
      displayQuestion: false
    }
  }

  fireQuestion = () => {
    this.setState({
      selectedQuestion: this.state.categoryQuestions[this.state.questionCount]
    })
    console.log(this.state.selectedQuestion)
    this.toggleShowQuestion()
  }

  toggleShowQuestion = () => {
    this.setState({ displayQuestion: !this.state.displayQuestion })
  }

  evaluateQuestion = (e) => {
    if (e.target.innerText === this.state.selectedQuestion.answer) {
      console.log('right');
    } else {
      console.log('wrong');
      this.state.questionMisses++;
      console.log(this.state.selectedQuestion)
      this.props.collectMissedQuestions(this.state.selectedQuestion);
    }
    this.state.questionCount++;
    this.toggleShowQuestions();
  }

  render() {
    const totalQuestions = this.state.categoryQuestions.length
    const score = `You've completed ${this.state.questionCount}/${totalQuestions} questions in this category.`
    const misses = `You've missed ${this.state.questionMisses} questions.`

    return(
      <div className="category-box">
      { this.state.questionCount !== totalQuestions &&
        <article>
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
            evaluateQuestion={this.evaluateQuestion}
          />  
        </article>
      }
      </div>
    )
  }
}