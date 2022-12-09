import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nominated from "./Nominated";
import ClubQuery from "../../../queries/ClubQuery";

const NextBook = (props) => {
  // const [selectedBook, setBook] = useState({
  //   currentbook: "",
  //   newbook: false
  // })

  const clubid = useParams().clubid;
  const navigate = useNavigate();

  //Not working
  const pickFromNominated = (array) => {
    let min = Math.ceil(0);
    let max = Math.floor(array.length - 1);
    // setBook({
    //   currentbook: array[Math.floor(Math.random() * (max - min + 1) + min)],
    //   newbook: false
    // })
    ClubQuery.update(clubid, {currentbook: array[Math.floor(Math.random() * (max - min + 1) + min)], newbook: false})
    .then(club => {
      navigate(`/clubs/${club.club._id}`)
    })  
  };

  return(
    <div className="club-right">
      <div className="mobile-banner">
        <p className="next-book-header">Nominated Books</p>
        <div className="arrow-down"></div>
      </div>
      {/* <p className="nominate-a-book-header">Vote on your next book:</p> */}
      <div className="nominations-container">
        {/* {props.nominations.map((nominated, index) => {
          return <Nominated
                    key={index}
                    nominated={nominated}
                /> 
        })} */}
      </div>
      <p className="select-book-button" onClick={() =>pickFromNominated(props.nominations)}>Select Next Book</p>
    </div>
  )
}

export default NextBook