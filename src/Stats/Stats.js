import React from 'react';

export function Stats(props) {
  return(
    <section className='category-stats'>
      <p className='category-completion'>You've attempted {props.questionCount}/{props.questionLength} questions in this category.</p>
      <p className='category-misses'>You've missed {props.incorrectCount} questions.</p>
    </section>
  );
}