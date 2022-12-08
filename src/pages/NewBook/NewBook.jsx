import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookQuery from "../../queries/BookQuery";
import ClubQuery from "../../queries/ClubQuery";
import "./NewBook.css"

const NewBook = () => {
  const [newBook, setBook] = useState({
    title: "",
    author: "",
  })

  const [club, setClub] = useState({
    currentbook: "",
  });
  
  const clubid = useParams().clubid

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    ClubQuery.show(clubid)
    .then(club => {
      BookQuery.create(newBook)
      .then(book => {
        if (club.newbook === true) {
          ClubQuery.updatearray(clubid, {nomination: book.book._id})
          .then(navigate(`/clubs/${clubid}`));
        } else {
          ClubQuery.update(clubid, newBook)
          .then(navigate(`/clubs/${clubid}`));
        }
      })
    })
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
    </div>
  )
}

export default NewBook;
