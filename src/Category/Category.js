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
      this.props.collectMissedQuestions(this.state.selectedQuestion.id);
    }
    this.toggleShowQuestion();
    this.toggleShowFeedback();
  }

  refreshCategory() {}

  gatherReviewQuestions() {
    console.log()
    // let gatheredQuestions = this.props.storage.reduce((acc, id) => {
    //   let findquestions = this.props.questions.filter(question => {
    //     if (question.id === id) {return question}
    //   })
    //   acc.push(findquestions);
    //   return acc;
    // }, [])
    // console.log(gatheredQuestions)
    // this.setState({ categoryQuestions: gatheredQuestions })
  }

  componentDidMount() {
    if (this.props.category) {
      let categoryQuestions = this.props.questions.filter(question => {
        return question.category === this.props.category
      })
    this.setState({ categoryQuestions: categoryQuestions })
    } else {
      console.log(this.props.storage)
      this.setState({ categoryQuestions: this.props.storage})
      // this.gatherReviewQuestions(this.props.storage); 
    }
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
          { this.props.category &&
          <h2> {this.props.category} </h2>
          }
          { !this.props.category &&
          <div>
            <h2> Review </h2>
            <p className="review">Revisit the questions that you previously have missed!</p>
          </div>
          }
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
       { !this.props.category &&
          <div>
            <h2> Review </h2>
            <p className="review">Revisit the questions that you previously have missed!</p>
          </div>
          }
        <p>All questions attempted.</p>
        <span>{summary}</span>
      </div>
      }
      </div>
    )
  }
}