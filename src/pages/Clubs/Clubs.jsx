import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClubQuery from "../../queries/ClubQuery";
import Cookies from "universal-cookie";
import Club from "./Components/Club";
import "./Clubs.css";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  const cookies = new Cookies();

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")};
    if (token.token === undefined) {
      return;
    } else {
      ClubQuery.all()
      .then(clubs => {
        setClubs(clubs)
      })
    }
  }, []);

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
    </div>
  );
};

export default Clubs;