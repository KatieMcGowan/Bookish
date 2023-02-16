import { useState, useEffect } from "react";
import BookQuery from "../../../queries/BookQuery";

const PastBook = (props) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
  });

  useEffect(() => {
    BookQuery.show(props.pastBook)
    .then(book => {
      setBook({
        title: book.title,
        author: book.author
      })
    });
  }, [props.pastBook]);

  return(
    <div className="past-book-container">
      <p className="past-book">{book.title}</p>
      <p className="past-book"> by {book.author}</p>
    </div>
  );
};

export default PastBook;