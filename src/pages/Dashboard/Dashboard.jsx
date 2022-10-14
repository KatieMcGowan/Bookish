import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import UserQuery from "../../queries/UserQuery";
import "./Dashboard.css"

const Dashboard = (props) => {
  // let navigate()
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

  const [displayname, setDisplayname] = useState("")

  useEffect(() => {
    UserQuery.show(props.id)
    .then(response => {
      setDisplayname(response.displayname)
    })
  }, [])

  return(
    <div className="dashboard-wrapper">
      <p className="welcome-text">Good {time}, {displayname}.</p>
      <div className="dashboard-links">
        <Link className="dashboard-link" to={"/myclubs"}>View your clubs</Link>
        <Link className="dashboard-link" to={"/clubs"}>Browse clubs</Link>
        <Link className="dashboard-link" to={"/myinvites"}>Manage your invites</Link>
      </div>
    </div>
  );
};

export default Dashboard;