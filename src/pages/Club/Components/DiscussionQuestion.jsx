import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ClubQuery from "../../../queries/ClubQuery";

const DiscussionQuestion = (props) => {
  const [deleteConfirm, setConfirm] = useState(false);

  const handleDeleteModal = () => {
    deleteConfirm === false ? setConfirm(true) : setConfirm(false)
  };

  const handleQuestionDelete = () => {
    ClubQuery.deletefromarray(props.clubId, {question: props.question})
    .then(props.setQuestions(props.questions.filter(question => question !== props.question)))
    .then(handleDeleteModal());
  };

  return(
    <div className="discussion-questions">
      <div className="discussion-question">
        {props.isAdmin === true &&
          <FontAwesomeIcon className="check" icon={faX} onClick={() => handleDeleteModal()}/>
        }
        <p className="question">{props.question}</p>
      </div>
      {deleteConfirm === true &&
        <div className="delete-modal">
          <p>Are you sure you want to delete this question?</p>
          <div className="delete-options">
            <p className="delete-option" onClick={() => handleQuestionDelete()}>Yes</p>
            <p className="delete-option" onClick={() => handleDeleteModal()}>No</p>
          </div>
        </div>
      }
    </div>
  );
};

export default DiscussionQuestion;