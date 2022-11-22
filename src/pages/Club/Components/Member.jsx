import { useState, useEffect } from "react"
import UserQuery from "../../../queries/UserQuery";

const Member = (props) => {
  const [member, setMember] = useState("");

  useEffect(() => {
    if (props.member === props.adminId) {
      return;
    } else {
      UserQuery.show(props.member)
      .then(response => {
        setMember(response.displayname)
      })
    }
  }, []) 

  return (
    <div className="members-list">
      <p className="member">{member}</p>
    </div> 
  );  
};

export default Member;
