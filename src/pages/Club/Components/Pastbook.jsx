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
    <p className="past-book">{book.title} by {book.author}</p>
  );
};

export default PastBook;