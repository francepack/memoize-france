import React, { Component } from 'react';
import Question from '../Question/Question';
import Feedback from '../Feedback/Feedback';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryQuestions: [],
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
      this.setState({ 
        correctCount: this.state.correctCount + 1,
        questionCount: this.state.questionCount + 1,
        currentQuestionCorrect: true 
      });
    } else {
      this.setState({
        incorrectCount: this.state.incorrectCount + 1,
        questionCount: this.state.questionCount + 1,
        currentQuestionCorrect: false
      });
      this.props.collectMissedQuestions(this.state.selectedQuestion);
    }
    this.toggleShowQuestion();
    this.toggleShowFeedback();
  }

  refreshCategory() {}

  componentDidMount() {
    let categoryQuestions = this.props.questions.filter(question => {
       return question.category === this.props.category
      })
    this.setState({ categoryQuestions: categoryQuestions })
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
            <p className="category-completion">{score}</p>
            <p className="category-misses">{misses}</p>
          </section>
          <button onClick={this.fireQuestion} className="question-btn">Fire Question!</button>
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