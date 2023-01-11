import { useParams, useNavigate } from "react-router-dom";
import Nominated from "./Nominated";
import ClubQuery from "../../../queries/ClubQuery";

const NextBook = (props) => {
  const clubId = useParams().clubid;

  const viewNominations = () => {
    props.setView(false)
  };

  const pickFromNominated = (array) => {
    let min = Math.ceil(0);
    let max = Math.floor(array.length - 1);
    let randomBook = array[Math.floor(Math.random() * (max - min + 1) + min)];
    if (props.currentBook !== undefined) {
      let newPastBooks = props.pastBooks
      newPastBooks.unshift(props.currentBook)
      ClubQuery.updatearray(clubId, {pastbook: props.currentBook})
      .then(props.setPastBooks(newPastBooks))
    };  
    ClubQuery.update(clubId, {
      currentbook: randomBook, 
      questions: [],
      userscompleted: [],
      nextbook: false,
    })
    .then(ClubQuery.deletefromarray(clubId, {nomination: randomBook}))
    .then(props.setCurrentBook(randomBook))
    .then(props.setQuestions([]))
    .then(props.setCompleted([]))
    .then(props.setNextBook(false))
    .then(props.setView(false))
    .then(props.setNominations(props.nominations.filter(nomination => nomination !== randomBook)))
  };

  const navigate = useNavigate();

  const handleNominateDirect = () => {
    navigate(`/clubs/${clubId}/nominate`)
  };

  return(
    <div className="club-right">
      <div className="mobile-banner-right">
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
          {props.nextBook === false &&
            <p className="book-button" onClick={() => viewNominations()}>View current book</p>
          }
        </div>
        {(props.isAdmin === true && props.nominations.length > 0) &&
          <div className="book-buttons-container">
            <p className="book-button" onClick={() =>pickFromNominated(props.nominations)}>Select next book</p>
          </div>  
        }
      </div>
    </div>
  );
};

export default NextBook;