import React from 'react';

function Finish(props) {
  return(
    <div className="finish-category-summary">
      <p className="category-finish">All questions attempted.</p>
      <p>You answered {props.correctCount} of {props.questionLength} correctly.</p>
      <button onClick={props.refreshCategory} className="refresh-category">Restart Category</button>
    </div>
  )
}

export default Finish;