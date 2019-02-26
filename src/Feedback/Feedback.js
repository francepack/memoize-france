import React from 'react';

function Feedback(props) {
  return(
    <div>
    { props.showFeedback &&
      <div className="feedback-overlay">
        <article className="feedback-box">
          { props.questionFeedback && 
            <p className="positive-feedback">Well Done!</p>
          } { !props.questionFeedback &&
            <p className="incorrect-feedback">You best do some studyin!</p>
          }
          <p className="learn-more">Learn more <a href={props.questionInfo}>At MDN</a></p>
          <button className="next-btn" onClick={props.toggleFeedback}>Return</button>
        </article>  
      </div>
    }
    </div>
  )
}

export default Feedback;