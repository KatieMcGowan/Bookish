import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import BookQuery from "../../queries/BookQuery";
import ClubQuery from "../../queries/ClubQuery";
import "./NewBook.css"

const NewBook = () => {
  const [newBook, setBook] = useState({
    title: "",
    author: "",
  })

  const [success, setSuccess] = useState(false)

  const [error, setError] = useState(false)
  
  const clubId = useParams().clubid

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    ClubQuery.show(clubId)
    .then(club => {
      BookQuery.create(newBook)
      .then(book => {
        if (book.errorcode === 1) {
          setError(true)
        } else {
          if (club.newbook === true) {
            ClubQuery.updatearray(clubId, {nomination: book.book._id})
            .then(setSuccess(true))
            .then(setTimeout(() => {
              navigate(`/clubs/${clubId}/nominate`)
            }, 2000))
          } else {
            ClubQuery.update(clubId, newBook)
            .then(setSuccess(true))
            .then(setTimeout(()=> {
              navigate(`/clubs/${clubId}/nominate`)
            }, 2000))  
          };
        };
      });
    });
  };
  
  const handleChange = (event) => {
    setBook({
      ...newBook,
      [event.target.name]: event.target.value
    });
  };

  return(
    <div className="new-book-wrapper">
      <p className="new-book-header">Add a Book</p>
      {success === true
        ? <p className="new-book-sucess">Success! Redirecting you to the nominate page...</p>
        : <div className="new-book-form">
            <form onSubmit={handleSubmit}>
              <div className="new-book-form-inputs">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  className="new-book-form-input"
                  minLength="2"
                  maxLength="50"
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
                  maxLength="50"
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
      } 
      {error === true &&
        <div className="book-already-exists-error">
          <p className="book-already-exists-message">This book already exists.</p>
          <Link className="link-to-search" to={`/clubs/${clubId}/nominate`}>Return to search</Link>
        </div>
      }
    </div>
  )
}

export default NewBook;
