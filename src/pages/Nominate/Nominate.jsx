import { useParams } from "react-router-dom";
import SearchBooks from "./Components/SearchBooks";
import "./Nominate.css";

const Nominate = () => {
  const clubId = useParams().clubid;

  return(
    <div className="nominate-wrapper">
      <p className="nominate-header">Nominate a New Read</p>
      <p className="search-text">Look through our catalog to see if your book exists. If not, you'll be able to add a book to our catalog.</p>
      <SearchBooks 
        path={2}
        clubId={clubId}
      />
    </div>
  );
};

export default Nominate;