import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import UserQuery from "../../queries/UserQuery";
import "./Dashboard.css"

const Dashboard = (props) => {
  //AUTH TOKEN CHECK
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    let token = cookies.get("TOKEN")
    if (token) {
      return
    } else {
      navigate("/login")
    }
  }, [])


  //GREETINGS: TIME STATE AND USEEFFECT HOOK
  const [time, setTime] = useState();

  useEffect(() => {
    let now = new Date();
    let hour = now.getHours()
    if (hour > 3 && hour < 12) {
      setTime("morning")
    } else if (hour >= 12 && hour < 18) {
      setTime("afternoon")
    } else setTime("evening")
  }, [])

  //GREETINGS: DISPLAY NAME STATE AND USEEFFECT HOOK
  const [displayname, setDisplayname] = useState("")

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")}
    UserQuery.getid(token)
    .then(response => {
      UserQuery.show(response.userId)
      .then(response => {
        setDisplayname(response.displayname)
      })
    })
  }, [])

  //FUNCTIONS TO HANDLE REDIRECT
  const handleViewClick = () => {
    navigate("/myclubs")
  }

  const handleBrowseClick = () => {
    navigate("/clubs")
  }

  return(
    <div className="dashboard-wrapper">
      <p className="welcome-text">Good {time}, {displayname}.</p>
      <div className="dashboard-links">
        <div className="dashboard-options" onClick={() => handleViewClick()}>
          <FontAwesomeIcon icon={faUsers} />
          <p className="dashboard-link" to={"/myclubs"}>View your clubs</p>
        </div>
        <div className="dashboard-options" onClick={() => handleBrowseClick()}>
          <FontAwesomeIcon icon={faBook} />
          <p className="dashboard-link" to={"/clubs"}>Browse clubs</p>
        </div>
        {/* <Link className="dashboard-link" to={"/myinvites"}>Manage your invites</Link> */}
      </div>
    </div>
  );
};

export default Dashboard;