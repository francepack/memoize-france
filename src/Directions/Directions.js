import React from 'react';

export function Directions(props) {
  return(
    <div>
      {props.displayDirections &&
      <div className="directions-overlay">
        <article className="directions-box">
          <p>There is always more to learn about coding. Pick a category to be quizzed on, and test your knowledge. Try to conquer each subject area!</p> 
          <p>You can revist the questions that gave you trouble at the bottom of the quiz.</p>
          <p>To update questions saved for review, or to restart a whole category, simply refresh the page.</p>
          <button className="direction-close" onClick={props.toggleDirections}>Close</button>
        </article>
      </div>
      }
    </div>
  );
}