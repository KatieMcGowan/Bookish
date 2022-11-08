import { useState, useEffect } from "react";
import UserQuery from "../../../queries/UserQuery";
import ClubQuery from "../../../queries/ClubQuery";
import Cookies from "universal-cookie";
import DiscussionQuestion from "./DiscussionQuestion";

const CurrentBook = (props) => {
  //HOOKS TO CALCULATE AND POPULATE PERCENTAGE OF USERS WHO HAVE COMPLETED
  const [percentComplete, setPercent] = useState()

  const calculatePercent = (num1, num2) => {
    return Math.round((num1 / num2) * 100)
  };

  useEffect(() => {
    setPercent(calculatePercent(50, 60))
    // setPercentage((props.userscompleted / props.members) * 100)
  }, [])

  //HOOKS TO DETERMINE IF USER HAS COMPLETED THE BOOK, AND TOGGLE BUTTONS APPROPRIATELY
  const [userCompleted, setCompleted] = useState(false);

  const cookies = new Cookies();

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")}
    UserQuery.getid(token)
    .then(id => {
        for (let i = 0; i < props.members.length; i++) {
          if (id === props.members[i]) {
            setCompleted(true)
          }; 
        };
      });
  }, [])

  const handleFinish = () => {
    let token = {token: cookies.get("TOKEN")}
    UserQuery.getid(token)
    .then(response => {
      ClubQuery.finishbook(props.id, {usercompleted: response.userId})
    })
    .then(setCompleted(true));
  }

  //HOOKS TO HANDLE USER ADDING A DISCUSSION QUESTION
  const [question, setQuestion] =  useState()

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAddQuestion = (event) => {
    event.preventDefault();
    ClubQuery.addquestion(props.id, {question: question})
  }

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
          {userCompleted === true
            ? <p className="book-button">Nominate a book</p>
            : <p className="book-button" onClick={() => handleFinish()}>Finished</p>
          }
        </div>
      </div>      
      <div className="discussion-container">
        <div className="mobile-banner">
          <p className="discussion-header">Discussion Questions</p>
          <div className="arrow-down"></div>
        </div>
        {props.questions.map((question, index) => {
          return <DiscussionQuestion
                  key={index}
                  question={question}
                />
        })}
        <div className="new-question-container">
          <form className="new-question-field" onSubmit={handleAddQuestion}>
            <input
              type="text"
              className="new-question-input"
              name="question"
              minLength="5"
              maxLength="500"
              placeholder="Add a discussion question"
              onChange={handleChange}
              value={question}
            />
            <input type="submit" className="submit" value="Submit"/>
          </form>  
        </div>
      </div>
    </div>
  );
};

export default CurrentBook