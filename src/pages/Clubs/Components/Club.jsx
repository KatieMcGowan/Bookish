import { useNavigate } from "react-router-dom";
import ClubQuery from "../../../queries/ClubQuery";

const Club = (props) => {
  const navigate = useNavigate();

  const handleJoinClub = () => {
    ClubQuery.updatearray(props.club._id, {member: props.userId})
    .then(navigate(`/clubs/${props.club._id}`));
  };

  return(
    <div className="clubs-individual-club">
      <div className="clubs-club-name-and-invite-status">
        <p className="clubs-club-name">{props.club.clubname}</p>
        <p className="clubs-club-invite-status" onClick={() => handleJoinClub()}>Join Club</p>
      </div>
      <div className="clubs-club-blurb-and-meeting">
        <p className="clubs-club-blurb">{props.club.description}</p>
        <p className="clubs-club-meeting">Meet up: {props.club.meetup}</p>
      </div>
    </div>
  );
};

export default Club;