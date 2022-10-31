import { useNavigate } from "react-router-dom";

const MemberClub = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/clubs/${props.myclub._id}`)
  }
  return(
    <div className="my-clubs-club" onClick={() => handleClick()}>
      <p className="my-clubs-club-name">{props.myclub.clubname}</p>
    </div>
  );
};

export default MemberClub;