// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCheck } from "@fortawesome/free-solid-svg-icons"
import Nominated from "./Nominated"

const NextBook = (props) => {
  console.log(props)
  return(
    <div className="club-right">
      <div className="mobile-banner">
        <p className="next-book-header">Next Book</p>
        <div className="arrow-down"></div>
      </div>
      <p className="nominate-a-book-header">Vote on your next book:</p>
      <div className="nominations-container">
        
        {/* <div className="nomination-container">
          <FontAwesomeIcon className="check" icon={faCheck}/>
          <div className="nominated-book">What a Fish Knows by Jonathan Balcombe</div>
        </div>
        <div className="nomination-container">
          <FontAwesomeIcon className="check" icon={faCheck}/>
          <div className="nominated-book">Super volcanos by Robin George Andrews</div>
        </div>
        <div className="nomination-container">
          <FontAwesomeIcon className="check" icon={faCheck}/>
          <div className="nominated-book">Thinking, Fast and Slow by Daniel Kahnemann</div>
        </div>
        <div className="nomination-container">
          <FontAwesomeIcon className="check" icon={faCheck}/>
          <div className="nominated-book">The Neuroscience of You by Chantel Prat</div>
        </div>
        <div className="nomination-container">
          <FontAwesomeIcon className="check" icon={faCheck}/>
          <div className="nominated-book">Existential Physics by Sabine Hossenfelder</div>
        </div> */}
      </div>  
    </div>
  )
}

export default NextBook