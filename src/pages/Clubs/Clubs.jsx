import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ClubQuery from "../../queries/ClubQuery";
import UserQuery from "../../queries/UserQuery";
import Club from "./Components/Club";
import "./Clubs.css";

const Clubs = () => {
  const [sortedClubs, setSortedClubs] = useState([])
  
  const navigate = useNavigate();

  const userContext = useOutletContext()

  useEffect(() => {
    ClubQuery.all()
    .then(clubs => {
      UserQuery.show(userContext.id)
      .then(user => {
        setSortedClubs(clubs.filter(club => !user.clubsmember.includes(club._id)))
      })
    })
  }, []);

  const handleHomeRedirect = () => {
    navigate("/home")
  };

  return(
    <div className="clubs-wrapper">
      <p className="clubs-header">Browse Clubs</p>
      <p className="click-to-join">Click to join the club.</p>
      <div className="clubs-container">
        {sortedClubs.map((club, index) => {
          return <Club
                  key={index}
                  club={club}
                  userId={userContext.id}
                />  
        })}
      </div>
      <div className="clubs-container">
        {sortedClubs.length === 0 &&
          <div className="no-clubs-container">
            <p className="no-clubs">No available clubs.</p>
            <Link className="create-a-club" to={"/clubs/new"}>Create a club</Link>
          </div>  
        }      
      </div>
      <div className="return-home" onClick={() => handleHomeRedirect()}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Return home</p>
      </div>  
    </div>
  );
};

export default Clubs;