import React from 'react';

function Directions(props) {
  return(
    <div>
      {props.displayDirections &&
      <div className="directions-overlay">
        <article className="directions-box">
          <p className="directions-content">There is always more to learn when it comes to coding! Find the category you'd like to learn about, test your knowledge, and try to conquer each subject area!</p> 
          <p className="directions-content">You are able to revist the questions you may have missed at the bottom of the quiz.</p>
          <p className="directions-content">To update questions saved for review, or to restart a whole category, simply refresh the page.</p>
          <button className="direction-close" onClick={props.toggleDirections}>close</button>
        </article>
      </div>
      }
    </div>
  )
}

export default Directions;