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

  showQuestion = () => {
    this.setState({
      selectedQuestion: this.state.categoryQuestions[this.state.questionCount]
    })
    this.toggleShowQuestion()
  }

  toggleShowQuestion = () => {
    this.setState({ displayQuestion: !this.state.displayQuestion })
  }

  toggleShowFeedback = () => {
    if (this.state.showFeedback === true) {
      this.setState({ questionCount: this.state.questionCount +1 })
    }
    this.setState({ showFeedback: !this.state.showFeedback })
  }

  evaluateQuestion = (e) => {
    if (e.target.innerText === this.state.selectedQuestion.answer) {
      this.setState({ 
        correctCount: this.state.correctCount + 1,
        currentQuestionCorrect: true 
      });
    } else {
      this.setState({
        incorrectCount: this.state.incorrectCount + 1,
        currentQuestionCorrect: false
      });
      this.props.collectMissedQuestions(this.state.selectedQuestion.id);
    }
    this.endQuestion();
  }

  endQuestion = () => {
    this.toggleShowQuestion();
    this.toggleShowFeedback();
  }

  refreshCategory = () => {
    this.setState({
      questionCount: 0,
      incorrectCount: 0,
      correctCount: 0
    })
  }

  componentDidMount() {
    if (this.props.category) {
      let categoryQuestions = this.props.questions.filter(question => {
        return question.category === this.props.category
      })
    this.setState({ categoryQuestions: categoryQuestions })
    } else {
      this.setState({ categoryQuestions: this.props.storage})
    }
  }

  render() {
    return(
      <div className="category-box">
      { this.state.questionCount !== this.state.categoryQuestions.length &&
        <article>
          { this.props.category &&
          <h2> {this.props.category} </h2>
          }
          { !this.props.category &&
          <div>
            <h2> Review </h2>
            <p className="review">Revisit the questions you missed previously.</p>
          </div>
          }
          <section className="category-stats">
            <p className="category-completion">You've completed {this.state.questionCount}/{this.state.categoryQuestions.length} questions in this category.</p>
            <p className="category-misses">You've missed {this.state.incorrectCount} questions.</p>
          </section>
          <button onClick={this.showQuestion} className="question-btn">Fire Question!</button>
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
      { this.state.questionCount === this.state.categoryQuestions.length &&
      <div className="finish-category-summary">
       { !this.props.category &&
          <div>
            <h2> Review </h2>
            <p className="review">Revisit the questions that you missed on prior visits to this site.</p>
          </div>
          }
        <p className="category-finish">All questions attempted.</p>
        <p>You answered {this.state.correctCount} of {this.state.categoryQuestions.length} correctly.</p>
        <button onClick={this.refreshCategory} className="refresh-category">Restart Category</button>
      </div>
      }
      </div>
    )
  }
}