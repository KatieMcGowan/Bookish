const DiscussionQuestion = (props) => {
  return(
    // <div className="discussion-container">
    //   <div className="mobile-banner">
    //     <p className="discussion-header">Discussion Questions</p>
    //     <div className="arrow-down"></div>
    //   </div>

      <div className="discussion-questions">
        <p className="question">{props.question}</p>
      </div>
    // </div>
  )
}

export default DiscussionQuestion;