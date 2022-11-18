const FoundBook = (props) => {
  return(
    <div>
      {props.path === 1 && 
        <div className="search-result" onClick={() => props.handleSecondSubmit(props.result._id)}>
          <p>{props.result.title}</p>
          <p>{props.result.author}</p>
        </div>  
      }
    </div>
  );
};

export default FoundBook