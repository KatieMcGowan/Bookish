import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserQuery from "../../../queries/UserQuery";
import ClubQuery from "../../../queries/ClubQuery";
// import BookQuery from "../../../queries/BookQuery";
import Cookies from "universal-cookie";
import DiscussionQuestion from "./DiscussionQuestion";

const CurrentBook = (props) => {
  // HOOKS TO CALCULATE AND POPULATE PERCENTAGE OF USERS WHO HAVE COMPLETED
  // const [percentComplete, setPercent] = useState(Math.round((props.userscompleted.length / props.members.length) * 100))

  // const calculatePercent = (num1, num2) => {
  //   return Math.round((num1 / num2) * 100)
  // };

  // useEffect(() => {
  //   setPercent(calculatePercent(props.userscompleted.length, props.members.length))
  // }, [])

  // const [currentBook, setCurrentBook] = useState({
  //   title: "",
  //   author: "",
  // })

  // useEffect(() => {
  //   BookQuery.show(props.currentbook)
  //   .then(book => {
  //     // console.log(book)})
  //     setCurrentBook({
  //       title: book.title,
  //       author: book.author,
  //     });
  //   });
  // }, [])

  //HOOKS TO DETERMINE IF USER HAS COMPLETED THE BOOK, AND TOGGLE BUTTONS APPROPRIATELY
  const [userCompleted, setCompleted] = useState(false);

  const cookies = new Cookies();

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")}
    UserQuery.getid(token)
    .then(response => {
      for (let i = 0; i < props.userscompleted.length; i++) {
        if (response.userId === props.userscompleted[i]) {
          setCompleted(true)
        }; 
      };
    });
  })
  
  //FUNCTIONS TO HANDLE BUTTON CLICKS
  const handleFinish = () => {
    let token = {token: cookies.get("TOKEN")}
    UserQuery.getid(token)
    .then(response => {
      ClubQuery.updatearray(props.id, {usercompleted: response.userId})
    })
    .then(setCompleted(true));
  }

  const navigate = useNavigate();

  const handleNominateDirect = () => {
    navigate(`/clubs/${props.id}/nominate`)
  }

  const initiateVote = () => {
    ClubQuery.update(props.id, {newbook: true})
    props.setInitiative(true);
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
        <p className="current-book">Current Book: {props.currentbook.title} by {props.currentbook.author}</p>
        <progress value={props.userscompleted.length} max={props.members.length}>{Math.round((props.userscompleted.length / props.members.length) * 100)}%</progress>
        <p className="percentage-of-completion">{Math.round((props.userscompleted.length / props.members.length) * 100)}% of members have finished this book</p>
        <div className="book-buttons-container">
          {userCompleted === true
            ? <p className="book-button" onClick={() => handleNominateDirect()}>Nominate a book</p>
            : <p className="book-button" onClick={() => handleFinish()}>Finished</p>
          }
          {props.adminCheck === true &&
            <p className="book-button" onClick={() => initiateVote()}>Initiate Vote</p>
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