import React from 'react';

export function Directions(props) {
  return(
    <div>
      {props.displayDirections &&
        <div className='directions-overlay'>
          <div className='directions-box'>
            <article className='directions-text'>
              <p>There is always more to learn about coding. Review will help ensure you remember knowledge picked up along the way. Choose a category to be quizzed on, and test your knowledge! Try to finish each subject area!</p> 
              <p>You can revist the questions that gave you trouble at the bottom of the quiz in the Review category.</p>
            </article>
            <button className='direction-close' onClick={props.toggleDirections}>Close</button>
          </div>
        </div>
      }
    </div>
  );
}