import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const Nominated = (props) => {
  return(
    <div className="nomination-container">
      <FontAwesomeIcon className="check" icon={faCheck}/>
    <div className="nominated-book">Existential Physics by Sabine Hossenfelder</div>
  </div>
  )
}
export default Nominated;