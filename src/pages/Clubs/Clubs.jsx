import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ClubQuery from "../../queries/ClubQuery";
import Cookies from "universal-cookie";
import Club from "./Components/Club";
import "./Clubs.css";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")};
    if (token.token === undefined) {
      return;
    } else {
      ClubQuery.all()
      .then(clubs => {
        setClubs(clubs)
      })
    };
  }, []);

  const handleHomeRedirect = () => {
    navigate("/home")
  };

  return(
    <div className="clubs-wrapper">
      <p className="clubs-header">Clubs</p>
      <div className="clubs-container">
        {clubs.length === 0 &&
          <div className="no-clubs-container">
            <p className="no-clubs">No clubs created yet.</p>
            <Link className="create-a-club" to={"/clubs/new"}>Create a club</Link>
          </div>  
        }      
        {clubs.map((club, index) => {
            return <Club
                    key={index}
                    club={club}
                  />  
          })}
      </div>
      <div className="return-home" onClick={() => handleHomeRedirect()}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Return home</p>
      </div>  
    </div>
  );
};

export default Clubs;