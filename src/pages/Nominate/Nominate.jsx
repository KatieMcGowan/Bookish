import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClubQuery from "../../queries/ClubQuery";
import "./Nominate.css"

const Nominate = () => {
  const [nomination, setNomination] = useState({
    title: "",
    author: "",
  })
  
  const clubid = useParams().clubid
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let stringNomination = nomination.title + " by " + nomination.author;
    ClubQuery.nominatebook(clubid, {nominated: stringNomination})
    .then(navigate(`/clubs/${clubid}`))
  }
  
  const handleChange = (event) => {
    setNomination({
      ...nomination,
      [event.target.name]: event.target.value
    });
  };

  return(
    <div className="nominate-wrapper">
      <p className="nominate-header">Nominate a Book</p>
      <div className="nominate-form">
        <form onSubmit={handleSubmit}>
          <div className="nominate-form-inputs">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="nominate-form-input"
              minLength="2"
              maxLength="30"
              required={true}
              onChange={handleChange}
              value={nomination.title}
            />
          </div>  
          <div className="nominate-form-inputs">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              className="nominate-form-input"
              minLength="3"
              maxLength="200"
              required={true}
              onChange={handleChange}
              value={nomination.author}
            />
          </div>  
          <div className="nominate-form-submit">
            <input type="submit" className="submit" value="Submit"/>
          </div>  
        </form>
      </div>
    </div>
  );
};

export default Nominate;