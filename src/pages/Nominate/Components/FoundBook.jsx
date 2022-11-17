const FoundBook = (props) => {
  return(
    <div className="search-result">
      <p>{props.result.title}</p>
      <p>{props.result.author}</p>
    </div>  
  );
};

export default FoundBook