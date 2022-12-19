import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import ClubQuery from "../../../queries/ClubQuery"

const DiscussionQuestion = (props) => {
  const handleQuestionDelete = () => {
    ClubQuery.deletefromarray(props.clubId, {question: props.question})
    .then(props.setQuestions(props.questions.filter(question => question !== props.question)))
  }

  return(
    <div className="discussion-questions">
      {props.isAdmin === true &&
        <FontAwesomeIcon className="check" icon={faX} onClick={() => handleQuestionDelete()}/>
      }
      <p className="question">{props.question}</p>
    </div>
  )
}

export default DiscussionQuestion;