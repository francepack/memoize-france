import React, { Component } from 'react';
import { QuestionContainer } from '../QuestionContainer/QuestionContainer';
import { Finish } from '../Finish/Finish';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      selectedQuestion: this.props.categoryQuestions[this.state.questionCount]
    });
    this.toggleShowQuestion();
  }

  toggleShowQuestion = () => {
    this.setState({ displayQuestion: !this.state.displayQuestion });
  }

  toggleShowFeedback = () => {
    if (this.state.showFeedback === true) {
      this.setState({ questionCount: this.state.questionCount +1 });
    };
    this.setState({ showFeedback: !this.state.showFeedback });
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
    };
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
    });
  }

  render() {
    return(
      <div className="category-box">
        <h2> {this.props.category} </h2>
        { this.props.category === 'Review' &&
            <p className="review">Revisit the questions you missed previously.</p>
        }
        { this.state.questionCount !== this.props.categoryQuestions.length &&
          <QuestionContainer 
            questionCount={this.state.questionCount}
            correctCount={this.state.correctCount}
            incorrectCount={this.state.incorrectCount}
            displayQuestion={this.state.displayQuestion}
            questionLength={this.props.categoryQuestions.length}
            selectedQuestion={this.state.selectedQuestion}
            evaluateQuestion={this.evaluateQuestion}
            showQuestion={this.showQuestion}
            showFeedback={this.state.showFeedback}
            questionInfo={this.state.selectedQuestion.link}
            toggleFeedback={this.toggleShowFeedback}
            questionFeedback={this.state.currentQuestionCorrect}
          />
        }
        { this.state.questionCount === this.props.categoryQuestions.length &&
          <Finish
            correctCount={this.state.correctCount}
            questionLength={this.props.categoryQuestions.length}
            refreshCategory={this.refreshCategory} 
          />
        }
      </div>
    );
  }
}