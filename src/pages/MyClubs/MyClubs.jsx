import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import MyClub from "./Components/MyClub"
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
  const [myClubs, setClubs] = useState([]);

  const [user, setUser] = useState("")

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")}
    UserQuery.getid(token)
    .then(response => {
      UserQuery.show(response.userId)
      .then(user => {
        setClubs(user.clubsmember);
        setUser(response.userId)
        })
      })
  }, []);

  return(
    <div className="my-clubs-wrapper">
      <p className="my-clubs-header">My Clubs</p>
      <div className="my-clubs-container">
        {myClubs.map((myclub, index) => {
          return <MyClub
                  key={index}
                  myclub={myclub}
                  user={user}
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
    </div>
  );
};

export default MyClubs