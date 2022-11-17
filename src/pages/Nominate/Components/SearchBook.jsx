import { useState } from "react";
import BookQuery from "../../../queries/BookQuery";

const SearchBook = () => {
  const [searchCategory, setCategory] = useState("Title");

  const [title, setTitle] = useState("");

  const [author, setAuthor] = useState("");

  const [result, setResult] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchCategory === "Title") {
      BookQuery.searchtitle(title)
      // .then(response => console.log(response))
      .then(response => {
        if (response === undefined) {
          setResult(null)
        } else {
          setResult(response)
        }
      })
    // } else {
      // console.log("In the author thread!" + author)
      // BookQuery.searchauthor({author: author})
      // .then(response => console.log(response))
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

  return(
    <div className="search-book-wrapper">
      <p className="search-book-header">Search for a Book to Nominate</p>
      <div className="search-book-form">
        <form onSubmit={handleSubmit}>
          <div className="search-book-div">
            <label htmlFor="title">{searchCategory}</label>
            <input
              type="text"
              name={searchCategory}
              className="search-book-input"
              minLength="2"
              maxLength="100"
              required={true}
              onChange={handleInputChange}
              // value={nomination.title}
            />
          </div>  
          <div className="search-book-form-submit">
            <input type="submit" className="submit" value="Submit"/>
          </div>  
        </form>
        <div className="category-options-container">
          <label htmlFor="title">Title</label>
          <input 
            type="radio" 
            className="togglecategory" 
            name="searchCategory" 
            value="Title"
            onChange={handleCategoryChange}
            defaultChecked
          />
          <label htmlFor="author">Author</label>
          <input 
            type="radio" 
            className="togglecategory" 
            name="searchCategory" 
            value="Author"
            onChange={handleCategoryChange}
          />
        </div>
      </div>
      <div className="results-container">
        {result !== null
        ? <div className="search-result">
            <p>{result.title}</p>
            <p>{result.author}</p>
          </div>  
        : <p>No results found. Click here to add your book!</p>
        }
      </div>
    </div>
  );
};

export default SearchBook;