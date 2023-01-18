import { useNavigate } from "react-router-dom";
import ClubQuery from "../../../queries/ClubQuery";

const Club = (props) => {
  const navigate = useNavigate();

  const handleJoinClub = () => {
    ClubQuery.updatearray(props.club._id, {member: props.userId})
    .then(navigate(`/clubs/${props.club._id}`));
  };

  return(
    <div className="clubs-individual-club" onClick={() => handleJoinClub()}>
      <p className="clubs-club-name">{props.club.clubname}</p>
      <p className="clubs-club-blurb">{props.club.description}</p>
      <p className="clubs-club-meeting">Meet up: {props.club.meetup}</p>
    </div>
  );
};

export default Club;