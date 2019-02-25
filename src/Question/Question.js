import React from 'react';

function Question(props) {
  return(
    <div>
    {props.displayQuestion &&
      <div className="question-overlay">
        <article className="question-content">
          <section className="question">
            {props.selectedQuestion.question}
          </section>
          <section className="answers">
            {props.selectedQuestion.options.map((answerOption, i) => (
              <div className="answer" onClick={props.evaluateQuestion}>{answerOption}</div>
            ))}
          </section> 
        </article>
      </div>  
    }  
    </div>    
  )
}

export default Question;