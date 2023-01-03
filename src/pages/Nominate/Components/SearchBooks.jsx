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

  const [success, setSuccess] = useState(false)

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
    navigate(`/clubs/${props.clubId}/newbook`);
  }

  return(
    <div className="search-book-wrapper">
      <p className="search-book-header">Search for a book</p>
      {success === true
        ? <p className="nomination-sucess">Success! Redirecting you to the club page...</p>
        : <div>
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
            </div>
            <div className="results-container">
              {firstSearch === true && results.length > 0 &&
                <div className="results-found">
                  <p>{results.length} result(s) found. Click on book you would like to select.</p>
                  <p>-or-</p>
                  <p className="click-here" onClick={() => handleNewBookRedirect()}>Add a book to the collection</p>
                  {results.map((result, index) => {
                    return <FoundBook
                              key={index}
                              result={result}
                              path={props.path}
                              clubId={props.clubId}
                              handleSecondSubmit={props.handleSecondSubmit}
                              setSuccess={setSuccess}
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

//On the topic of limiting search results: 
//Leverage state
//All results stored in one state
//Only results index 0-9 pushed into current results and mapped
//Have a button that serves as a counter, number stored in state. 
//Next 10, previous 10, etc.
//counter 0 correlates with 0-9, 1 with 10 - 19, 2 with 20 - 29, etc.