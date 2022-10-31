import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import AdminClub from "./Components/AdminClub";
import MemberClub from "./Components/MemberClub"
import ClubQuery from "../../queries/ClubQuery";
import UserQuery from "../../queries/UserQuery";
import "./MyClubs.css"

const MyClubs = () => {
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

  //MY CLUB STATE
  const [myAdminClubs, setAdminClubs] = useState([]);

  const [myMemberClubs, setMemberClubs] = useState([]);

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")}
    UserQuery.getid(token)
    .then(response => {
      UserQuery.show(response.userId)
      .then(response => {
        setAdminClubs(response.clubsadmin)
        })
      })
  }, []);

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")}
    UserQuery.getid(token)
    .then(response => {
      UserQuery.show(response.userId)
      .then(response => {
        setMemberClubs(response.clubsmember)
        })
      })
  }, []);

  return(
    <div className="my-clubs-wrapper">
      <p className="my-clubs-header">My Clubs</p>
      <div className="my-clubs-container">
        {myAdminClubs.map((myclub, index) => {
          return <AdminClub
                  key={index}
                  myclub={myclub}
                />  
        })}
        {myMemberClubs.map((myclub, index) => {
          return <MemberClub
                  key={index}
                  myclub={myclub}
                />  
        })}
      </div>
      <Link className="create-a-club" to={"/clubs/new"}>Create a club</Link>
    </div>
  );
};

export default MyClubs