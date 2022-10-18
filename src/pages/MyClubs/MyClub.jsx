import { Link, useNavigate } from "react-router-dom";

const MyClub = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/clubs/${props.myclub._id}`)
  }
  return(
    <div className="my-clubs-club" onClick={() => handleClick()}>
      <p className="my-clubs-club-name">{props.myclub.clubname}</p>
      {/* <Link className="my-clubs-club-name" to={`/clubs/${props.myclub._id}`}>{props.myclub.clubname}</Link> */}
    </div>
  );
};

export default MyClub;