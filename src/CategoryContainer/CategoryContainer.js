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
        });
        return(
          <Category 
            key={category}
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
        <Category 
          category='Review'
          collectMissedQuestions={props.collectMissedQuestions}
          categoryQuestions={props.storage}   
        />
      );
    };
  }
   
  return(
    <section className='category-container'>
      {renderCategories()}
      {renderReview()}
    </section>
  );
}

export default CategoryContainer;