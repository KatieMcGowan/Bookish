import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookQuery from "../../queries/BookQuery";
import "./NewBook.css"

const NewBook = () => {
  const [newBook, setBook] = useState({
    title: "",
    author: "",
  })

  const clubid = useParams().clubid
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    BookQuery.create(newBook)
    .then(navigate(`/clubs/${clubid}`))
  }
  
  const handleChange = (event) => {
    setBook({
      ...newBook,
      [event.target.name]: event.target.value
    });
  };

  return(
    <div className="new-book-wrapper">
      <p className="new-book-header">Add a Book</p>
      <div className="new-book-form">
        <form onSubmit={handleSubmit}>
          <div className="new-book-form-inputs">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="new-book-form-input"
              minLength="2"
              maxLength="30"
              required={true}
              onChange={handleChange}
              value={newBook.title}
            />
          </div>  
          <div className="new-book-form-inputs">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              className="new-book-form-input"
              minLength="3"
              maxLength="200"
              required={true}
              onChange={handleChange}
              value={newBook.author}
            />
          </div>  
          <div className="new-book-form-submit">
            <input type="submit" className="submit" value="Submit"/>
          </div>  
        </form>
      </div>
    </div>
  )
}

export default NewBook;
