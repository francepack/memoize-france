import React, { Component } from 'react';


export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: {}
    }
  }

  render() {
    return(
      <div>
      {this.props.displayQuestion &&
        <div className="question-overlay">
          <article className="question-content">
            <section className="question">
              {this.props.selectedQuestion.question}
            </section>
            <section className="answers">
              {this.props.selectedQuestion.options.map((answerOption, i) => (
                <div className="answer" onClick={this.props.evaluateQuestion}>{answerOption}</div>
              ))}
            </section> 
          </article>
        </div>  
      }  
      </div>    
    )
  }
}