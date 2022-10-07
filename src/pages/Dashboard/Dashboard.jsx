import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import "./Dashboard.css"

const Dashboard = (props) => {
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

  return(
    <div className="dashboard-wrapper">
      <p className="welcome-text">Good {time}, Elizabeth.</p>
      <div className="dashboard-links">
        <Link className="dashboard-link" to={"/myclubs"}>View your clubs</Link>
        <Link className="dashboard-link" to={"/clubs"}>Browse clubs</Link>
        <Link className="dashboard-link" to={"/myinvites"}>Manage your invites</Link>
      </div>
    </div>
  );
};

export default Dashboard;