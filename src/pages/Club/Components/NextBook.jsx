import { useParams, useNavigate } from "react-router-dom";
import Nominated from "./Nominated";
import ClubQuery from "../../../queries/ClubQuery";

const NextBook = (props) => {

  const clubid = useParams().clubid;
  const navigate = useNavigate();

  //Not working
  const pickFromNominated = (array) => {
    let min = Math.ceil(0);
    let max = Math.floor(array.length - 1);
    let randomBook = array[Math.floor(Math.random() * (max - min + 1) + min)]
    ClubQuery.update(clubid, {currentbook: randomBook, newbook: false})
    .then(club => {
      props.setCurrentBook(club.currentbook)
    })  
    .then(props.setNewBook(false))
  };

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
                /> 
        })}
      </div>
      {props.isAdmin === true &&
        <p className="book-button" onClick={() =>pickFromNominated(props.nominations)}>Select Next Book</p>
      }
    </div>
  )
}

export default NextBook