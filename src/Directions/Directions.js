import React from 'react';

function Directions(props) {
  return(
    <div>
      {props.displayDirections &&
      <article className="directions-box">
        <p className="directions-content">There is always more to learn when it comes to coding! Find the category you'd like to learn about, test your knowledge, and try to conquer each subject area! You are able to revist the questions you may have missed at the bottom of the quiz.</p>
        <button className="directions-content close-btn" onClick={props.toggleDirections}>close</button>
      </article>
      }
    </div>
  )
}

export default Directions;