import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClubQuery from "../../queries/ClubQuery";
import UserQuery from "../../queries/UserQuery";
import Cookies from "universal-cookie";
// import Club from "./Components/Club";
import "./Clubs.css"

const Clubs = (props) => {
  const [id, setId] = useState();

  const cookies = new Cookies();

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")};
    if (token.token === undefined) {
      return;
    } else {
      UserQuery.getid(token)
      .then(response => {
        setId(response.userId)
      });
    };
  }, []);   

  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const nonMember = [];
    ClubQuery.all()
    .then(response => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].members.length === 0 && response[i].admin !== id) {
          nonMember.push(response[i])
        } else if (response[i].members.length > 0 && response[i].admin !== id) {
          for (let j = 0; j < response[i].members.length; i++) {
            if (i !== response[i].members[j]) {
              nonMember.push(response[i])
            }
          }
        }
      }
    });
    setClubs(nonMember);
  }, [id]);

  const [pendingclub, setPendingClub] = useState([]);

  useEffect(() => {
    
  })

  const [requestClub, setRequestClub] = useState([])




  // console.log(id);

  return(
    <div className="clubs-wrapper">
      <p className="clubs-header">Clubs</p>
      <div className="clubs-container">
        {/* {clubs.map((club, index) => {
            return <Club
                    key={index}
                    club={club}
                  />  
          })} */}
        <Link to={"/clubs/new"} className="new-club">Start a new club</Link>

        {/* <div className="clubs-individual-club">
          <div className="clubs-club-name-and-invite-status">
            <p className="clubs-club-name">Bay Area Bookies</p>
            <p className="clubs-club-invite-status">Pending</p>
          </div>
          <div className="clubs-club-blurb-and-meeting">
            <p className="clubs-club-blurb">A club dedicated to Bay Area writers and thinkers</p>
            <p className="clubs-club-meeting">Meet at Revielle Coffee Co. every first Sunday of the month at 2:00PM.</p>
          </div>
        </div>
        <div className="clubs-individual-club">
          <div className="clubs-club-name-and-invite-status">
            <p className="clubs-club-name">High Fantasy</p>
            <p className="clubs-club-invite-status">Request Invite</p>
          </div>
          <div className="clubs-club-blurb-and-meeting">
            <p className="clubs-club-blurb">We freaking LOVE DRAGONS!!!</p>
            <p className="clubs-club-meeting">Meets on Discord once a month, date/time TBA. Our Discord is High Fantasy Bookish Club.</p>
          </div>
        </div>
        <div className="clubs-individual-club">
          <div className="clubs-club-name-and-invite-status">
            <p className="clubs-club-name">Read and Hike</p>
            <p className="clubs-club-invite-status">Request Invite</p>
          </div>
          <div className="clubs-club-blurb-and-meeting">
            <p className="clubs-club-blurb">Literature discussions out in nature</p>
            <p className="clubs-club-meeting">Every other Saturday at noon at Reinhardt Redwood Regional Park.</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Clubs;