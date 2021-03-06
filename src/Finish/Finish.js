import React from 'react';

export function Finish(props) {
  return(
    <div className='finish-category-summary'>
      <div className='summary'>
        <p className='category-finish'>All questions attempted.</p>
        <p>You answered {props.correctCount} of {props.questionLength} correctly.</p>
      </div>
      <button onClick={props.refreshCategory} className='refresh-category'>Restart Category</button>
    </div>
  );
}