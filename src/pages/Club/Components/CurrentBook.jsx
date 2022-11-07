import { useState, useEffect } from "react";
const CurrentBook = (props) => {
  const [percentComplete, setPercent] = useState()

  const calculatePercent = (num1, num2) => {
    return Math.round((num1 / num2) * 100)
  };

  useEffect(() => {
    setPercent(calculatePercent(50, 60))
    // setPercentage((props.userscompleted / props.members) * 100)
  }, [])

  console.log(percentComplete)

  return(
    <div className="club-right">
      <div className="book-mobile-banner">
        <p className="current-book-header">Current Book</p>
        <div className="arrow-down"></div>
      </div>
      <div className="book-container">
        <p className="current-book">Current Book: {props.currentbook}</p>
        <p className="percentage-of-completion">{percentComplete}% of members have finished this book</p>
        <div className="book-buttons-container">
          <p className="book-button">Finished</p>
          <p className="book-button">Nominate a book</p>
        </div>
      </div>
      <div className="discussion-container">
        <div className="mobile-banner">
          <p className="discussion-header">Discussion Questions</p>
          <div className="arrow-down"></div>
        </div>
        <div className="discussion-questions">
          <p className="question">Does anyone else feel weird eating mushrooms now?</p>
          <p className="question">What current research efforts with mushrooms make you the most excited? What about more text, how will you handle this now? What about for really really long bois like me?</p>
        </div>
        <div className="new-question-container">
          <form className="new-question-field">
            <input
              type="text"
              className="new-question-input"
              minLength="5"
              maxLength="500"
              placeholder="Add a discussion question"
            />
            <input type="submit" className="submit" value="Submit"/>
          </form>  
        </div>
      </div>
    </div>
  );
};

export default CurrentBook