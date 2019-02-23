import React, { Component } from 'react';


export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      particularQuestion: {}
    }
  }

  render() {
    return(
      <div className="overlay">
        <article className="question-box">
          <p>Question here</p>
        </article>
      </div>    
    )
  }
}