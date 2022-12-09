const PastBook = (props) => {
  console.log(props)
  return(
    <div className="past-books-list">
    <p className="past-book">{props.pastbook}</p>
  </div>
  );
};

export default PastBook;