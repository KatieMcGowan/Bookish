import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./MyClubs.css"

const MyClubs = (props) => {
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
  })
  
  return(
    <div className="my-clubs-wrapper">
      <p className="my-clubs-header">My Clubs</p>
      <div className="my-clubs-container">
        <div className="my-clubs-club">
          <p className="my-clubs-club-name">Science Nerds</p>
        </div>
        <div className="my-clubs-club">
          <p className="my-clubs-club-name">Queer Voices</p>
        </div>
        <div className="my-clubs-club">
          <p className="my-clubs-club-name">History Buffs</p>
        </div>
        <div className="my-clubs-club">
          <p className="my-clubs-club-name">Dystopia</p>
        </div>
      </div>
      <Link className="create-a-club" to={"/clubs/new"}>Create a club</Link>
    </div>
  );
};

export default MyClubs