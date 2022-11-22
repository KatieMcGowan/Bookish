import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserQuery from "../../../queries/UserQuery";
import Cookies from "universal-cookie";
import ClubQuery from "../../../queries/ClubQuery";

const Club = (props) => {
  const [member, setMember] = useState(false)

  const [id, setId] = useState();

  const cookies = new Cookies();

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")};
    UserQuery.getid(token)
    .then(user => {
      setId(user.userId);
      for (let i = 0; i < props.club.members.length; i++) {
        if (user.userId === props.club.admin || user.userId === props.club.members[i]) {
          setMember(true)
        }  
      }
    })
  }, []);

  // FUNCTIONS TO HANDLE CLICKS
  const navigate = useNavigate();

  const handleViewRedirect = () => {
    navigate(`/clubs/${props.club._id}`)
  }

  const handleJoinClub = () => {
    ClubQuery.updatearray(props.club._id, {member: id})
    UserQuery.updatearray(id, {clubmember: props.club._id})
    navigate(`/clubs/${props.club._id}`)
  }

  return(
    <div className="clubs-individual-club">
      <div className="clubs-club-name-and-invite-status">
        <p className="clubs-club-name">{props.club.clubname}</p>
        {member === true 
          ? <p className="clubs-club-invite-status" onClick={() => handleViewRedirect()}>View Club</p>
          : <p className="clubs-club-invite-status" onClick={() => handleJoinClub()}>Join Club</p>
        }
        {/* <p className="clubs-club-invite-status">Pending</p> */}
      </div>
      <div className="clubs-club-blurb-and-meeting">
        <p className="clubs-club-blurb">{props.club.description}</p>
        <p className="clubs-club-meeting">{props.club.meetup}</p>
      </div>
    </div>
  );
};

export default Club;