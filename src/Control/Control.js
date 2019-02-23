import React, { Component } from 'react';
import Question from '../Question/Question.js';

export default class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuestion: {}
    }
  }

  fireQuestion = () => {
    console.log(this.props)
    this.setState({
      selectedQuestion: this.props.questionPool.shift()
    })
    // console.log(this.state.selectedQuestion)
  }

  render() {
    console.log(this.state.selectedQuestion)
    return(
      <button onClick={this.fireQuestion}>Fire Question</button>
    )
  }
}
