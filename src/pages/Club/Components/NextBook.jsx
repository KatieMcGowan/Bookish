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
    .then(club => {
      if (props.currentbook) {
        ClubQuery.updatearray(clubId, {pastbook: props.currentBook});
        props.pastbooks.push(props.currentBook)
      } 
    }) 
    .then(props.setCurrentBook(randomBook))
    .then(props.setQuestions([]))
    .then(props.setNominations([]))
    .then(props.setCompleted([]))
    .then(props.setNewBook(false))
    .then(props.setView(true))
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
      <div className="nominations-container">
        {props.nominations.length === 0 && 
          <p>No books currently nominated. Click the button below to add one.</p>
        }
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
          <p className="book-button" onClick={() => handleNominateDirect()}>Nominate a book</p>
          {props.newBook === false &&
            <p className="book-button" onClick={() => viewNominations()}>View current book</p>
          
          }
          {props.isAdmin === true &&
            <p className="book-button" onClick={() =>pickFromNominated(props.nominations)}>Select Next Book</p>
          }
        </div>
      </div>
    </div>
  )
}

export default NextBook