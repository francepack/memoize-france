import React from 'react';
import Category from '../Category/Category';

function CategoryContainer(props) {
  return(
    <div>
      { props.categories &&
        <main className='category-container'>
          {props.categories.map((category, i) => (
            <Category 
              key={i}
              category={category}
              collectMissedQuestions={props.collectMissedQuestions}
              categoryQuestions={props.questions.filter(question => {
                  return question.category === category
                  })}
            />
          ))}
        </main>
      }
      {props.storage &&
        <article className='review-containter'>
          <Category
            collectMissedQuestions={props.collectMissedQuestions}
            storage={props.storage}
            category='Review'
          />
        </article>
      }
    </div>  

  )
}

export default CategoryContainer;