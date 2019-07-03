import React from 'react';
import { Question } from '../Question/Question';
import { Feedback } from '../Feedback/Feedback';
import { Stats } from '../Stats/Stats';

export function QuestionContainer(props) {
  return(
    <article>
      <div className='question-area'>
        <div className='start-question'>
          <button onClick={props.showQuestion} className='question-btn'>Fire Question!</button>
        </div>
        <div className='category-stats'>
          <Stats 
            questionCount={props.questionCount}
            questionLength={props.questionLength}
            incorrectCount={props.incorrectCount}
          />
        </div>
      </div>
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
  );
}