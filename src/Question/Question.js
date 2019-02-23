import React, { Component } from 'react';


export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      particularQuestion:{}
    }
  }

  render() {
    return(
      <p>Question here</p>
    )
  }
}