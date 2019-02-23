import React, { Component } from 'react';
import Control from '../Control/Control.js'

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryQuestions: props.questions.filter(question => {
        if (question.category === this.props.category) {
          return question
      }})
    }
  }

  render() {
    console.log(this.state.categoryQuestions)
    let questionCount = 0;
    let questionMisses = 0;
    let totalQuestions = this.state.categoryQuestions.length
    let score = `You've completed ${questionCount}/${totalQuestions} questions in this category.`
    let misses = `You've missed ${questionMisses} questions.`

    return(
      <article className="category-box">
        <h2> {this.props.category} </h2>
        <section className="category-stats">
          <p>{score}</p>
          <p>{misses}</p>
        </section>
        <Control 
          questionPool={this.state.categoryQuestions}
        />
      </article>   
    )
  }
}