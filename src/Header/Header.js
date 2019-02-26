import React, { Component } from 'react';
import Directions from  '../Directions/Directions';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      displayDirections: false
    }
  }

  toggleDirections = () => {
    this.setState({ displayDirections: !this.state.displayDirections })
  }

  render() {
    return(
      <header className="header">
        <h1 className="title">codeQuiz</h1>
        <button className="direction-btn" onClick={this.toggleDirections}>Info</button>
        <p className="subtitle">Find a subject to study and test your knowledge</p>
        <Directions 
          displayDirections={this.state.displayDirections}
          toggleDirections={this.toggleDirections}
        />
      </header>
    )
  }
}
        