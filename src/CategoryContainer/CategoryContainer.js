import React from 'react';
import Category from '../Category/Category';

function CategoryContainer(props) {

  const renderCategories = () => {
    if (props.questions) {
      const allCategories = props.questions.reduce((acc, question) => {
        if (!acc.includes(question.category)) {
          acc.push(question.category);
        };
        return acc;
      }, []);
      return allCategories.map(category => {
        let categoryQuestions = props.questions.filter(question => {
          return question.category === category;
        })
        return(
          <Category key={category}
                    category={category}
                    collectMissedQuestions={props.collectMissedQuestions}
                    categoryQuestions={categoryQuestions}
          />
        );
      });
    }; 
  }

  const renderReview = () => {
    if (props.storage) {
      return(
        <Category category='Review'
                  collectMissedQuestions={props.collectMissedQuestions}
                  storage={props.storage}   
        />
      );
    };
  }
   
  return(
    <div>
      <main className='category-container'>
        {renderCategories()}
      </main>
      <section className='review-containter'>
        {renderReview()}
      </section>
    </div>  
  );
}

export default CategoryContainer;