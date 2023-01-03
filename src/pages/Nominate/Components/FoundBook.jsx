import { useNavigate } from "react-router-dom";
import ClubQuery from "../../../queries/ClubQuery";

const FoundBook = (props) => {
  const navigate = useNavigate();

  const handleNominate = () => {
    ClubQuery.updatearray(props.clubId, {nomination: props.result._id})
    .then(props.setSuccess(true))
    .then(setTimeout(() => {
      navigate(`/clubs/${props.clubId}`)
    }, 2000))
  };
  
  return(
    <div>
      {props.path === 1 && 
        <div className="search-result" onClick={() => props.handleSecondSubmit(props.clubId, props.result._id)}>
          <p>{props.result.title}</p>
          <p>{props.result.author}</p>
        </div>  
      }
      {props.path === 2 &&
        <div className="search-result" onClick={() => handleNominate()}>
          <p>{props.result.title}</p>
          <p>{props.result.author}</p>
        </div>  
      }
    </div>
  );
};

export default FoundBook;