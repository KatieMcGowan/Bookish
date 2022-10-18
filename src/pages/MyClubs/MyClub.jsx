import { useState } from "react";
import { Link } from "react-router-dom";

const MyClub = (props) => {
  return(
    <div className="my-clubs-club">
      <Link className="my-clubs-club-name" to={`/clubs/${props.myclub._id}`}>{props.myclub.clubname}</Link>
    </div>
  );
};

export default MyClub;