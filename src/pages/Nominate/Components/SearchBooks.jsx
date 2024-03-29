import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookQuery from "../../../queries/BookQuery";
import FoundBook from "./FoundBook";
import "../SearchBooks.css";

const SearchBooks = (props) => {
  const [searchCategory, setCategory] = useState("Title");

  const [title, setTitle] = useState("");

  const [author, setAuthor] = useState("");

  const [firstSearch, setSearch] = useState(false);

  const [results, setResult] = useState([]);

  const [success, setSuccess] = useState(false);

// ERROR STATES
  const [bookAlreadyNominated, setAlreadyNominated] = useState(false);

  const [nominationIsCurrentBook, setIsCurrentBook] = useState(false);

  const [bookAlreadyRead, setAlreadyRead] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAlreadyNominated(false);
    setIsCurrentBook(false);
    setAlreadyRead(false);
    setSearch(true);
    if (searchCategory === "Title") {
      BookQuery.searchtitle(title)
      .then(response => {
        setResult(response)
      });
    } else {
      BookQuery.searchauthor(author)
      .then(response => {
        setResult(response)
      })
    };
  };
  
  const handleCategoryChange = (event) => {
    if (searchCategory === "Title") {
      setAuthor(title);
      setTitle("");
    } else {
      setTitle(author);
      setAuthor("");
    };
    setCategory(event.target.value);
  };

  const handleInputChange = (event) => {
    if (searchCategory === "Title") {
      setTitle(event.target.value);
    } else {
      setAuthor(event.target.value);
    };
  };

  const navigate = useNavigate();

  const handleNewBookRedirect = () => {
    navigate(`/clubs/${props.clubId}/newbook`);
  };

  return(
    <div className="search-book-wrapper">
      <p className="search-book-header">Search for a book</p>
      {success === true
        ? <p className="nomination-sucess">Success! Redirecting you to the club page...</p>
        : <div>
            <div className="category-options-container">
              <div className="category-option">
                <input 
                  type="radio" 
                  className="togglecategory" 
                  name="searchCategory" 
                  value="Title"
                  onChange={handleCategoryChange}
                  defaultChecked
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="category-option">
                <input 
                  type="radio" 
                  className="togglecategory" 
                  name="searchCategory" 
                  value="Author"
                  onChange={handleCategoryChange}
                />
                <label htmlFor="author">Author</label>
              </div>
            </div>
            <div className="search-book-form">
              <form onSubmit={handleSubmit}>
                  <div className="search-inputs">
                    <input
                      type="text"
                      name={searchCategory}
                      className="search-book-input"
                      minLength="2"
                      maxLength="100"
                      required={true}
                      onChange={handleInputChange}
                    />
                    <input type="submit" className="submit" value="Submit"/>
                  </div>
              </form>
            </div>
            <div className="results-container">
              {firstSearch === true && results.length > 0 &&
                <div className="results-found">
                  <p className="book-results-text">{results.length} result(s) found. Click on book you would like to select.</p>
                  <p className="book-results-text">Still can't find your book?</p>
                  <p className="click-here" onClick={() => handleNewBookRedirect()}>Add a book to the collection</p>
                  {bookAlreadyNominated === true &&
                    <p className="nomination-taken">This book has already been nominated, please select another one.</p>
                  }
                  {nominationIsCurrentBook === true &&
                    <p className="nomination-taken">This book is currently being read by your club, please select another one.</p>
                  }
                  {bookAlreadyRead === true &&
                    <p className="nomination-taken">This book has already been read by your club, please select another one.</p>
                  }
                  {results.map((result, index) => {
                    return <FoundBook
                              key={index}
                              result={result}
                              path={props.path}
                              clubId={props.clubId}
                              handleSecondSubmit={props.handleSecondSubmit}
                              setSuccess={setSuccess}
                              setAlreadyNominated={setAlreadyNominated}
                              setIsCurrentBook={setIsCurrentBook}
                              setAlreadyRead={setAlreadyRead}
                            />  
                  })}
                </div>  
              }
              {firstSearch === true && results.length === 0 &&
                <div className="add-a-book">
                  <p>No results found.</p>
                  <p className="click-here" onClick={() => handleNewBookRedirect()}>Add a book to the collection.</p>
                </div>  
              }    
            </div>
          </div>
        }
    </div>
  );
};

export default SearchBooks;