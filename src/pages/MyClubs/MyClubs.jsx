import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import MyClub from "./Components/MyClub";
import UserQuery from "../../queries/UserQuery";
import "./MyClubs.css";

const MyClubs = () => {
  //DEPENDENCIES
  const navigate = useNavigate();

  const userContext = useOutletContext();

  //MY CLUB STATE
  const [myClubs, setClubs] = useState([]);

  useEffect(() => {
    UserQuery.show(userContext.id)
    .then(user => {
      setClubs(user.clubsmember)
    })
  }, [userContext.id])

  const handleHomeRedirect = () => {
    navigate("/home")
  };

  return(
    <div className="my-clubs-wrapper">
      <p className="my-clubs-header">My Clubs</p>
      <div className="my-clubs-container">
        {myClubs.map((myclub, index) => {
          return <MyClub
                  key={index}
                  myclub={myclub}
                  user={userContext.id}
                />  
        })}
      </div>
      {myClubs.length > 0
        ? <Link className="create-a-club" to={"/clubs/new"}>Create a club</Link>
        : <div className="no-my-clubs">
            <p className="no-clubs">No clubs found.</p>
            <Link className="create-a-club" to={"/clubs/new"}>Create a club</Link>
            <Link className="create-a-club" to={"/clubs"}>Browse clubs</Link>
          </div>  
      }
      <div className="return-home" onClick={() => handleHomeRedirect()}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Return home</p>
      </div>  
    </div>
  );
};

export default MyClubs;