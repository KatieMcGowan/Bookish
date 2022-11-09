import { useState, useEffect } from "react"
import UserQuery from "../../../queries/UserQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const Member = (props) => {
  const [member, setMember] = useState("");

  useEffect(() => {
    UserQuery.show(props.member)
    .then(response => {
      setMember(response.username)
    })
  }, [])

  return (
    <div className="members-list">
      <div className="admin-member">
        <p className="member">Polymathmatical</p>
        <FontAwesomeIcon icon={faCrown} />
      </div>
      <p className="member">VolcanoMan</p>
      <p className="member">Philiment</p>
      <p className="member">GeigerCount</p>
      <p className="member">ItzGeorge</p>
      <p className="member">Freshfinds</p>
      <p className="member">StemmyJenny</p>
      <p className="member">RockMomma</p>
    </div>
    // <div className="members-container">
    //   <div className="mobile-banner">
    //     <p className="members-header">Members</p>
    //     <div className="arrow-down"></div>
    //   </div>
    //   <div className="members-list">
    //     <div className="admin-member">
    //       <p className="member">Polymathmatical</p>
    //       <FontAwesomeIcon icon={faCrown} />
    //     </div>
    //     <p className="member">{member}</p>
    //     <p className="member">Philiment</p>
    //     <p className="member">GeigerCount</p>
    //     <p className="member">ItzGeorge</p>
    //     <p className="member">Freshfinds</p>
    //     <p className="member">StemmyJenny</p>
    //     <p className="member">RockMomma</p>
    //   </div>
    // </div>   
  );  
};

export default Member;
