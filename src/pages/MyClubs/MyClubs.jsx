import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import MyClub from "./MyClub";
import ClubQuery from "../../queries/ClubQuery";
import "./MyClubs.css"

const MyClubs = (props) => {
  console.log(props.id)
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
    ClubQuery.adminshow(props.id)
    .then(response => {
      setAdminClubs(response)
    });
  }, []);

  return(
    <div className="my-clubs-wrapper">
      <p className="my-clubs-header">My Clubs</p>
      <div className="my-clubs-container">
        {myAdminClubs.map((myclub, index) => {
          return <MyClub
                  key={index}
                  myclub={myclub}
                />  
        })}
        {/* <div className="my-clubs-club">
          <div className="divy-wivy">
            <p className="my-clubs-club-name">Science Nerds</p>
          </div>
        </div>
        <div className="my-clubs-club">
          <p className="my-clubs-club-name">Queer Voices</p>
        </div>
        <div className="my-clubs-club">
          <p className="my-clubs-club-name">History Buffs</p>
        </div>
        <div className="my-clubs-club">
          <p className="my-clubs-club-name">Dystopia</p>
        </div> */}
      </div>
      <Link className="create-a-club" to={"/clubs/new"}>Create a club</Link>
    </div>
  );
};

export default MyClubs