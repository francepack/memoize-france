import React, { Component } from 'react';
import Question from '../Question/Question';
import Feedback from '../Feedback/Feedback';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryQuestions: props.questions.filter(question => {
       return question.category === this.props.category
      }),
      selectedQuestion: {},
      questionCount: 0,
      incorrectCount: 0,
      correctCount: 0,
      currentQuestionCorrect: false,
      displayQuestion: false,
      showFeedback: false
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

  toggleShowFeedback = () => {
    this.setState({ showFeedback: !this.state.showFeedback })
  }

  evaluateQuestion = (e) => {
    if (e.target.innerText === this.state.selectedQuestion.answer) {
      this.state.correctCount++;
      this.setState({ 
        correctCount: this.state.correctCount,
        currentQuestionCorrect: true 
      });
    } else {
      this.state.incorrectCount++;
      this.setState({
        incorrectCount: this.state.incorrectCount,
        currentQuestionCorrect: false
      });
      this.props.collectMissedQuestions(this.state.selectedQuestion);
    }
    this.state.questionCount++;
    this.toggleShowQuestion();
    this.toggleShowFeedback();
  }

  render() {
    const totalQuestions = this.state.categoryQuestions.length
    const score = `You've completed ${this.state.questionCount}/${totalQuestions} questions in this category.`
    const misses = `You've missed ${this.state.incorrectCount} questions.`
    const summary = `You answered ${this.state.correctCount} of ${totalQuestions} correctly.`

    return(
      <div className="category-box">
      { this.state.questionCount !== totalQuestions &&
        <article>
          <h2> {this.props.category} </h2>
          <section className="category-stats">
            <p>{score}</p>
            <p>{misses}</p>
          </section>
          <button onClick={this.fireQuestion}>Fire Question!</button>
          <Question 
            displayQuestion={this.state.displayQuestion}
            selectedQuestion={this.state.selectedQuestion}
            evaluateQuestion={this.evaluateQuestion}
          />
          <Feedback 
            showFeedback={this.state.showFeedback}
            questionInfo={this.state.selectedQuestion.link}
            toggleFeedback={this.toggleShowFeedback}
            questionFeedback={this.state.currentQuestionCorrect}
          />  
        </article>
      }
      { this.state.questionCount === totalQuestions &&
      <div className="finish-category-summary">
        <p>All questions attempted.</p>
        <span>{summary}</span>
      </div>
      }
      </div>
    )
  }
}