import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import BookQuery from "../../../queries/BookQuery"
import ClubQuery from "../../../queries/ClubQuery";

const Nominated = (props) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
  })

  useEffect(() => {
    BookQuery.show(props.nominated)
    .then(book => {
      setBook({
        title: book.title,
        author: book.author
      })
    })
  }, [])

  const handleNominationDelete = () => {
    ClubQuery.deletefromarray(props.clubId, {nomination: props.nominated})
    .then(props.setNominations(props.nominations.filter(nomination => nomination !== props.nominated)))
  }

  return(
    <div className="nomination-container">
      {props.isAdmin === true &&
        <FontAwesomeIcon className="check" icon={faX} onClick={() => handleNominationDelete()}/>
      }
      <p>{book.title} by {book.author}</p>
  </div>
  )
}
export default Nominated;