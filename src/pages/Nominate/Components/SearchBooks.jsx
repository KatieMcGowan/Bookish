import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookQuery from "../../../queries/BookQuery";
import FoundBook from "./FoundBook";
import "../SearchBooks.css"

const SearchBooks = (props) => {
  const [searchCategory, setCategory] = useState("Title");

  const [title, setTitle] = useState("");

  const [author, setAuthor] = useState("");

  const [firstSearch, setSearch] = useState(false);

  const [results, setResult] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(true);
    if (searchCategory === "Title") {
      BookQuery.searchtitle(title)
      .then(response => {
        setResult(response)
      })
    } else {
      BookQuery.searchauthor(author)
      .then(response => {
        setResult(response)
      })
    };
  };
  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  };

  const handleInputChange = (event) => {
    if (searchCategory === "Title") {
      setTitle(event.target.value)
    } else {
      setAuthor(event.target.value)
    }
  };

  const navigate = useNavigate();

  //Club id necessary for redirect back to club page
  const handleNewBookRedirect = () => {
    navigate(`/clubs/${props.clubid}/newbook`);
  }

  return(
    <div className="search-book-wrapper">
      <p className="search-book-header">Search for a Book</p>
      <div className="search-book-form">
        <form onSubmit={handleSubmit}>
          <div className="search-book-div">
            <label htmlFor="title">Search by {searchCategory}</label>
          </div>  
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
        <div className="category-options-container">
          <input 
            type="radio" 
            className="togglecategory" 
            name="searchCategory" 
            value="Title"
            onChange={handleCategoryChange}
            defaultChecked
          />
          <label htmlFor="title">Title</label>
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
      <div className="results-container">
        {firstSearch === true && results.length > 0 &&
          <div>
            <p>{results.length} result(s) found. Click on book you would like to select. </p>
            {results.map((result, index) => {
              return <FoundBook
                        key={index}
                        result={result}
                        path={props.path}
                        handleSecondSubmit={props.handleSecondSubmit}
                      />  
            })}
          </div>  
        }
        {firstSearch === true && results.length === 0 &&
          <p onClick={() => handleNewBookRedirect()}>No results found. Click here to add a book to the collection!</p>
        }    
      </div>
    </div>
  );
};

export default SearchBooks;