import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import UserQuery from "../../../queries/UserQuery";
import ClubQuery from "../../../queries/ClubQuery";

const Member = (props) => {
  const [member, setMember] = useState("");

  useEffect(() => {
    if (props.member === props.adminId) {
      return;
    } else {
      UserQuery.show(props.member)
      .then(response => {
        setMember(response.displayname)
      });
    };
  }, [props.member, props.adminId]);

  const [deleteConfirm, setConfirm] = useState(false);

  const handleRemoveModal = () => {
    deleteConfirm === false ? setConfirm(true) : setConfirm(false)
  };

  const handleMemberRemove = () => {
    ClubQuery.deletefromarray(props.clubId, {question: props.question})
    .then(props.setQuestions(props.questions.filter(question => question !== props.question)))
  };

  return (
    <div className="members-list">
      {(props.isAdmin === true && props.member !== props.adminId) 
        ? <div className="removable-member">
            <FontAwesomeIcon className="member-check" icon={faX} onClick={() => handleRemoveModal()}/>
            <p className="member">{member}</p>
          </div>
        : <p className="member">{member}</p>
      }
      {deleteConfirm === true &&
        <div className="leave-modal-members">
          <p>Are you sure you want to remove {member} from the club?</p>
          <div className="leave-options">
            <p className="leave-option" onClick={() => handleMemberRemove()}>Yes</p>
            <p className="leave-option" onClick={() => handleRemoveModal()}>No</p>
          </div>
        </div>
      }
    </div> 
  );  
};

export default Member;
