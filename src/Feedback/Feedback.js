import React from 'react';

function Feedback(props) {
  return(
    <div>
    { props.showFeedback &&
      <div className="feedback-overlay">
        <article className="feedback-box">
          { props.questionFeedback &&
          <div> 
            <p className="correct-feedback feedback-head">Correct!</p>
            <p className="sub-feedback">Nailed it - On to the next!</p>
          </div>  
          } { !props.questionFeedback &&
          <div>  
            <p className="incorrect-feedback feedback-head">Sorry - Incorrect!</p>
            <p className="sub-feedback">Check out the below link for review. If you visit this quiz later, see the review section on the bottom of the page to try this one again.</p>
          </div>  
          }
          <p className="learn-more">Learn more at <a href={props.questionInfo}>MDN</a></p>
          <button className="next-btn" onClick={props.toggleFeedback}>Return</button>
        </article>  
      </div>
    }
    </div>
  )
}

export default Feedback;