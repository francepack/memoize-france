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
      <div>
      {this.props.displayQuestion &&
        <div className="question-overlay">
          <article className="question-content">
            <section className="question">
              {this.props.selectedQuestion.question}
            </section>
            <section className="answers">
              {this.props.selectedQuestion.options.map((answerOption, i) => (
                <div className="answer">{answerOption}</div>
              ))}
            </section> 
            <button onClick={this.props.toggleQuestion}>answer</button> 
          </article>
        </div>  
      }  
      </div>    
    )
  }
}