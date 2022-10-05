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
        <p className="dashboard-link">View your clubs</p>
        <p className="dashboard-link">Browse clubs</p>
        <p className="dashboard-link">Manage your invites</p>
      </div>
    </div>
  );
};

export default Dashboard;