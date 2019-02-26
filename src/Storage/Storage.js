import React, { Component } from 'react';

export default class Storage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return(
      <section className="storage">
        <p>Revisit questions you've missed!</p>
        <button className="storage-btn">Begin Review</button>
      </section>
    )
  }
}