import { useState, useEffect } from "react";
import UserQuery from "../../../queries/UserQuery";
import ClubQuery from "../../../queries/ClubQuery";
import Cookies from "universal-cookie";
import DiscussionQuestion from "./DiscussionQuestion";

const CurrentBook = (props) => {
  //HOOKS TO DETERMINE IF USER HAS COMPLETED THE BOOK, AND TOGGLE BUTTONS APPROPRIATELY
  const [userCompleted, setCompleted] = useState(false);

  const cookies = new Cookies();

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")};
    UserQuery.getid(token)
    .then(response => {
      for (let i = 0; i < props.userscompleted.length; i++) {
        if (response.userId === props.userscompleted[i]) {
          setCompleted(true)
        }; 
      };
    });
  }, [props.userscompleted]);
  
  //FUNCTIONS TO HANDLE BUTTON CLICKS
  const handleFinish = () => {
    let token = {token: cookies.get("TOKEN")};
    UserQuery.getid(token)
    .then(response => {
      ClubQuery.updatearray(props.id, {usercompleted: response.userId})
      .then(props.userscompleted.push(response.userId))
      .then(setCompleted(true))
    });
  };

  const viewNominations = () => {
    props.setView(true)
  };

  //HOOKS TO HANDLE USER ADDING A DISCUSSION QUESTION
  const [question, setQuestion] =  useState("");

  const [errorDisplay, setErrorDisplay] = useState(false);

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAddQuestion = (event) => {
    event.preventDefault();
    setErrorDisplay(false)
    ClubQuery.updatearray(props.id, {question: question})
    .then(response => {
      if (response.errorcode === 1 ){
        setErrorDisplay(true)
        return;
      } else {
        props.questions.push(question);
        setQuestion("");
      };
    });  
  };

  return(
    <div className="club-right">
      <div className="book-container">
        <div className="mobile-banner-right">
          <p className="current-book-header">Current Book</p>
          {/* <div className="arrow-down"></div> */}
        </div>
        <p className="current-book">{props.currentbook.title} by {props.currentbook.author}</p>
        <progress className="progress-bar" value={props.userscompleted.length} max={props.members.length}>{Math.round((props.userscompleted.length / props.members.length) * 100)}%</progress>
        <p className="percentage-of-completion">{Math.round((props.userscompleted.length / props.members.length) * 100)}% of members have finished this book</p>
        <div className="book-buttons-container">
          {userCompleted !== true &&
            <p className="book-button" onClick={() => handleFinish()}>Finish Current Book</p>
          }
          <p className="book-button" onClick={() => viewNominations()}>View Nominations</p>
        </div>
      </div>   
      <div className="discussion-container">
        <div className="mobile-banner-right">
          <p className="discussion-header">Discussion Questions</p>
          {/* <div className="arrow-down"></div> */}
        </div>
        {props.questions.map((question, index) => {
          return <DiscussionQuestion
                  key={index}
                  question={question}
                  setQuestions={props.setQuestions}
                  isAdmin={props.isAdmin}
                  questions={props.questions}
                  clubId={props.id}
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
              placeholder="Add a discussion question for your next meet up"
              onChange={handleChange}
              value={question}
            />
            <input type="submit" className="submit" value="Submit"/>
          </form>  
        </div>
        {errorDisplay === true &&
          <p className="question-taken">This question has already been posted, please post another one.</p>
        }
      </div>
    </div>
  );
};

export default CurrentBook;