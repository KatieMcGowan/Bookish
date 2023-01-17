import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import UserQuery from "../../queries/UserQuery";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const userContext = useOutletContext();

  // const token = {token: useOutletContext()}

  //GREETINGS: DISPLAY NAME STATE AND USEEFFECT HOOK
  const [displayname, setDisplayname] = useState("");

  const [time, setTime] = useState();

  useEffect(() => {
    setDisplayname(userContext.displayname)
  }, [userContext]);


  useEffect(() => {
    let now = new Date();
    let hour = now.getHours();
    if (hour > 3 && hour < 12) {
      setTime("morning")
    } else if (hour >= 12 && hour < 18) {
      setTime("afternoon")
    } else setTime("evening")
  }, []);

  //FUNCTIONS TO HANDLE REDIRECT
  const handleViewClick = () => {
    navigate("/myclubs")
  };

  const handleBrowseClick = () => {
    navigate("/clubs")
  };

  return(
    <div className="dashboard-wrapper">
      <p className="welcome-text">Good {time}, {displayname}.</p>
      <div className="dashboard-links">
        <div className="dashboard-options" onClick={() => handleViewClick()}>
          <FontAwesomeIcon icon={faUsers} />
          <p className="dashboard-link" to={"/myclubs"}>View My Clubs</p>
        </div>
        <div className="dashboard-options" onClick={() => handleBrowseClick()}>
          <FontAwesomeIcon icon={faBook} />
          <p className="dashboard-link" to={"/clubs"}>Browse Clubs</p>
        </div>
      </div>
    </div>
  );
};

export default Home;