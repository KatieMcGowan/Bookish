import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClubQuery from "../../../queries/ClubQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const MyClub = (props) => {
  const [club, setClub] = useState("");

  const [adminStatus, setStatus] = useState(false);

  useEffect(() => {
    ClubQuery.show(props.myclub)
    .then(club => {
      if (club.admin === props.user) {
        setStatus(true)
      };
      setClub(club.clubname)
    });
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/clubs/${props.myclub}`)
  };
  
  return(
    <div className="my-clubs-club" onClick={() => handleClick()}>
      {adminStatus === true &&
        <FontAwesomeIcon icon={faCrown} />
      }  
      <p className="my-clubs-club-name">{club}</p>
    </div>
  );
};

export default MyClub;