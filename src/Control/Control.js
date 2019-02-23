import React, { Component } from 'react';
import Question from '../Question/Question.js';

export default class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  fireQuestion = () => {
    console.log(this.props)
  }

  render() {
    return(
      <button onClick={this.fireQuestion}>Fire Question</button>
    )
  }
}
