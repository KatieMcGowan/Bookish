import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import ClubQuery from "../../../queries/ClubQuery";

const AdminClub = (props) => {
  const [myAdminClub, setAdminClub] = useState({
    id: "",
    name: "",
  })

  useEffect(() => {
    ClubQuery.show(props.myclub)
    .then(response => {
      setAdminClub({
        id: response._id,
        name: response.clubname
      });
    });
  }, [])

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/clubs/${myAdminClub.id}`)
  }
  return(
    <div className="my-clubs-club" onClick={() => handleClick()}>
      <FontAwesomeIcon icon={faCrown} />
      <p className="my-clubs-club-name">{myAdminClub.name}</p>
    </div>
  );
};

export default AdminClub;