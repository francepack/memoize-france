import React, { Component } from 'react';
// import Question from '../Question/Question';

export default class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuestion: {}
    }
  }

  render() {
    return(
      <button onClick={this.props.fireQuestion}>Fire Question</button>
    )
  }
}
