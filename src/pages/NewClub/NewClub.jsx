import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import ClubQuery from "../../queries/ClubQuery"
import "./NewClub.css"

const NewClub = (props) => {
  const navigate = useNavigate();

  const [newClub, setClub] = useState({
    clubname: "",
    description: "",
    meetup: "",
    admin: props.id,
    members: [],
    invitedmembers: [],
    currentbook: "",
    pastbooks: [],
    questions: [],
    userscompleted: [],
    nominations: [],
  })

  //"CLUB NAME ALREADY TAKEN" DISPLAY STATE
  const [errorDisplay, setErrorDisplay] = useState(false);

  //FORM FUNCTIONS
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorDisplay(false);
    ClubQuery.create(newClub)
    .then(response => {
      if (response.errorcode === 1 ){
        setErrorDisplay(true)
        return;
      } else {
        navigate("/myclubs")
      }
    })
  }
  
  const handleChange = (event) => {
    setClub({
      ...newClub,
      [event.target.name]: event.target.value
    });
  };
  
  return(
    <div className="new-club-wrapper">
      <p className="new-club-header">New Club</p>
      <div className="new-form-form">
        <form onSubmit={handleSubmit}>
          <div className="new-form-inputs">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="clubname"
              className="new-form-input"
              minLength="2"
              maxLength="30"
              required={true}
              onChange={handleChange}
              value={newClub.clubname}
            />
          </div>  
          <div className="new-form-inputs">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              className="new-form-input"
              minLength="3"
              maxLength="200"
              required={true}
              onChange={handleChange}
              value={newClub.description}
            />
          </div>  
          <div className="new-form-inputs">
            <label htmlFor="meeting">Meeting Details</label>
            <input
              type="text"
              name="meetup"
              className="new-form-input"
              minLength="4"
              maxLength="100"
              required={true}
              onChange={handleChange}
              value={newClub.meetup}
            />
          </div>  
          {/* <div className="new-form-inputs">
            <label htmlFor="members">Invite Members</label>
            <input
              type="text"
              name="members"
              className="new-form-input"
              minLength="4"
              maxLength="40"
              required={true}
              onChange={handleChange}
              value={newClub.invitedmembers}
            />
          </div>   */}
          <div className="new-form-submit">
            <input type="submit" className="submit" value="Submit"/>
          </div>  
        </form>
      </div>
      {errorDisplay === true &&
          <p className="clubname-taken">Club name is already taken, please choose another one.</p>
        }
    </div>
  );
};

export default NewClub