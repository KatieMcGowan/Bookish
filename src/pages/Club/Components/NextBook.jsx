import { useParams, useNavigate } from "react-router-dom";
import Nominated from "./Nominated";
import ClubQuery from "../../../queries/ClubQuery";

const NextBook = (props) => {
  const clubId = useParams().clubid;

  //Not working
  const pickFromNominated = (array) => {
    let min = Math.ceil(0);
    let max = Math.floor(array.length - 1);
    let randomBook = array[Math.floor(Math.random() * (max - min + 1) + min)]
    ClubQuery.update(clubId, {
      currentbook: randomBook, 
      questions: [],
      nominations: [],
      userscompleted: [],
      newbook: false,
    })
    .then(ClubQuery.updatearray(clubId, {pastbook: props.currentBook}))
    .then(props.setCurrentBook(randomBook))
    .then(props.setQuestions([]))
    .then(props.setNominations([]))
    .then(props.setCompleted([]))
    .then(props.pastbooks.push(props.currentBook))  
    .then(props.setNewBook(false))
  };

  const viewNominations = () => {
    props.setView(false)
  }

  const navigate = useNavigate();

  const handleNominateDirect = () => {
    navigate(`/clubs/${clubId}/nominate`)
  }

  return(
    <div className="club-right">
      <div className="mobile-banner">
        <p className="next-book-header">Nominated Books</p>
        <div className="arrow-down"></div>
      </div>
      {/* <p className="nominate-a-book-header">Vote on your next book:</p> */}
      <div className="nominations-container">
        {props.nominations.map((nominated, index) => {
          return <Nominated
                    key={index}
                    nominated={nominated}
                    nominations={props.nominations}
                    setNominations={props.setNominations}
                    clubId={clubId}
                    isAdmin={props.isAdmin}
                /> 
        })}
        <div className="book-buttons-container">
          {/* {props.adminCheck.isAdmin === true && */}
          <p className="book-button" onClick={() => handleNominateDirect()}>Nominate a book</p>
          {/* } */}
          {props.isAdmin === true &&
            <p className="book-button" onClick={() =>pickFromNominated(props.nominations)}>Select Next Book</p>
          }
        </div>
      </div>
    </div>
  )
}

export default NextBook