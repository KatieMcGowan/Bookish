import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
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
      <FontAwesomeIcon className="check" icon={faX}/>
    <div className="nominated-book">
      <p>{book.title} by {book.author}</p>
      {/* <p>by {book.author}</p> */}
    </div>
  </div>
  )
}
export default Nominated;