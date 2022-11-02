import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import UserQuery from "../../../queries/UserQuery";
import ClubQuery from "../../../queries/ClubQuery";

const Club = (props) => {
  const [relation, setRelation] = useState("")

  const cookies = new Cookies();

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")};
    if (token.token === undefined) {
      return;
    } else {
      UserQuery.getid(token)
      .then(response => {
        if (props.club.admin === response.userid) {
          setRelation("View Club")
        };
        if (props.club.members.length === 0) {
          setRelation("Request Invite")
        } else {
          for (let i = 0; i < props.club.members.length; i++) {
            if (response.userId === props.club.members[i]) {
              setRelation("View Club")
            } else {
              setRelation("Request Invite")
            }
          };
        }
        if (props.club.invitedmembers.length > 0) {
          for (let i = 0; i < props.club.invitedmembers.length; i++) {
            if (response.userId === props.club.invitedmembers[i]) {
              setRelation("Pending")
            }
          }
        }
        if (props.club.usersrequestedinvite.length > 0) {
          for (let i = 0; i < props.club.usersrequestedinvite.length; i++) {
            if (response.userId === props.club.usersrequestedinvite[i]) {
              setRelation("Pending")
            }
          }
        }
      })
    }  
  }, [])

  //Relation functions
  let navigate = useNavigate();

  const handleViewClub = () => {
    navigate(`/clubs/${props.club._id}`)
  }

  const handleRequestInvite = () => {
    let token = {token: cookies.get("TOKEN")};
    UserQuery.getid(token)
    .then(response => {
      ClubQuery.requestinvite(props.club._id, {requestee: response.userId})
      .then(setRelation("Pending"))
    });
  };

  return(
    <div className="clubs-individual-club">
      <div className="clubs-club-name-and-invite-status">
        <p className="clubs-club-name">{props.club.clubname}</p>
        {relation === "View Club" &&
          <p className="clubs-club-invite-status" onClick={() => handleViewClub()}>{relation}</p>
        }
        {relation === "Request Invite" &&
          <p className="clubs-club-invite-status" onClick={() => handleRequestInvite()}>{relation}</p>
        }
        {relation === "Pending" &&
          <p className="clubs-club-invite-pending">{relation}</p>
        }
      </div>
      <div className="clubs-club-blurb-and-meeting">
        <p className="clubs-club-blurb">{props.club.description}</p>
        <p className="clubs-club-meeting">{props.club.meetup}</p>
      </div>
    </div>
  );
};

export default Club;