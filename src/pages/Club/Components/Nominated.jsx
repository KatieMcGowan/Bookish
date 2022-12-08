import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import BookQuery from "../../../queries/BookQuery"

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

  return(
    <div className="nomination-container">
      <FontAwesomeIcon className="check" icon={faCheck}/>
    <div className="nominated-book">
      <p>{book.title}</p>
      <p>by {book.author}</p>
    </div>
  </div>
  )
}
export default Nominated;