import { useParams, useNavigate } from "react-router-dom"
import ClubQuery from "../../../queries/ClubQuery";

const FoundBook = (props) => {
  const clubid = useParams().clubid;
  const navigate = useNavigate();

  const handleNominate = () => {
    ClubQuery.updatearray(clubid, {nomination: props.result._id})
    .then(navigate(`/clubs/${clubid}`))
  }
  
  return(
    <div>
      {props.path === 1 && 
        <div className="search-result" onClick={() => props.handleSecondSubmit(props.result._id)}>
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

export default FoundBook