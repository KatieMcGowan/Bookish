import { useNavigate } from "react-router-dom";
import ClubQuery from "../../../queries/ClubQuery";

const FoundBook = (props) => {
  const navigate = useNavigate();

  const handleNominate = () => {
    props.setAlreadyNominated(false);
    props.setAlreadyRead(false);
    props.setIsCurrentBook(false);
    ClubQuery.updatearray(props.clubId, {nomination: props.result._id})
    .then(response => {
      if (response.errorcode === 1) {
        props.setAlreadyNominated(true)
        return;
      } else if (response.errorcode === 2) {
        props.setIsCurrentBook(true)
        return;
      } else if (response.errorcode === 3) {
        props.setAlreadyRead(true)
        return; 
      } else {
        props.setSuccess(true)
        setTimeout(() => {
          navigate(`/clubs/${props.clubId}`)
        }, 2000)
      };
    })
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