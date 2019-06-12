import React from 'react';
import Question from '../Question/Question';
import Feedback from '../Feedback/Feedback';
import Stats from '../Stats/Stats';

function QuestionContainer(props) {
  return(
    <article>
      <Stats 
        questionCount={props.questionCount}
        questionLength={props.questionLength}
        incorrectCount={props.incorrectCount}
      />
      <button onClick={props.showQuestion} className="question-btn">Fire Question!</button>
      <Question 
        displayQuestion={props.displayQuestion}
        selectedQuestion={props.selectedQuestion}
        evaluateQuestion={props.evaluateQuestion}
      />
      <Feedback 
        showFeedback={props.showFeedback}
        questionInfo={props.questionInfo}
        toggleFeedback={props.toggleFeedback}
        questionFeedback={props.questionFeedback}
      />  
    </article>
  )
}

export default QuestionContainer;