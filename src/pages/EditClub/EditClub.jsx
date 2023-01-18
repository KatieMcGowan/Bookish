import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import ClubQuery from "../../queries/ClubQuery";
import "./EditClub.css";

const EditClub = () => {
  const clubId = useParams().clubid;

  const navigate = useNavigate();

  const userContext = useOutletContext();

  //HOOKS USED TO POPULATE PLACEHOLDERS
  const [editedClub, setClub] = useState({
    clubname: "",
    description: "",
    meetup: "",
  });

  useEffect(() => {
    ClubQuery.show(clubId)
    .then(club => {
      if (club.admin === userContext.id) {
        setClub({
          clubname: club.clubname,
          description: club.description,
          meetup: club.meetup
        })
      } else {
        navigate(`/clubs/${clubId}`)
      }
    });
  }, [clubId, navigate, userContext]);

  //"CLUB NAME ALREADY TAKEN" DISPLAY STATE
  const [errorDisplay, setErrorDisplay] = useState(false);

  //FORM FUNCTIONS
  const handleChange = (event) => {
    setClub({
      ...editedClub,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorDisplay(false);
    ClubQuery.update(clubId, editedClub)
    .then(response => {
      if (response.errorcode === 1 ){
        setErrorDisplay(true)
        return;
      } else {
        navigate(`/clubs/${clubId}`)
      };
    });
  };

  //CLUB DELETE FUNCTIONS AND STATES
  const [deleteConfirm, setConfirm] = useState(false);

  const handleDeleteModal = () => {
    deleteConfirm === false ? setConfirm(true) : setConfirm(false)
  };

  const handleClubDelete = () => {
    ClubQuery.delete(clubId)
    .then(navigate("/home"));
  };

  return(
    <div className="edit-club-wrapper">
      <p className="edit-club-header">Edit Club</p>
      <div className="edit-form">
        <form onSubmit={handleSubmit}>
          <div className="edit-form-inputs">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="clubname"
              className="edit-form-input"
              minLength="2"
              maxLength="30"
              required={true}
              placeholder={editedClub.clubname}
              onChange={handleChange}
              value={editedClub.clubname}
            />
          </div>  
          <div className="edit-form-inputs">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              className="edit-form-input"
              minLength="3"
              maxLength="200"
              required={true}
              placeholder={editedClub.description}
              onChange={handleChange}
              value={editedClub.description}
            />
          </div>  
          <div className="edit-form-inputs">
            <label htmlFor="meeting">Meeting Details</label>
            <input
              type="text"
              name="meetup"
              className="edit-form-input"
              minLength="4"
              maxLength="40"
              required={true}
              placeholder={editedClub.meetup}
              onChange={handleChange}
              value={editedClub.meetup}
            />
          </div>  
          <div className="edit-form-submit">
            <input type="submit" className="submit" value="Submit"/>
          </div>  
        </form>
      </div>
      {errorDisplay === true &&
        <p className="clubname-taken">Club name is already taken, please choose another one.</p>
      }
      <p className="delete-club" onClick={() => handleDeleteModal()}>Delete club</p>
      {deleteConfirm === true &&
        <div className="delete-modal">
          <p>Are you sure you want to delete this club?</p>
          <div className="delete-options">
            <p className="delete-option" onClick={() => handleClubDelete()}>Yes</p>
            <p className="delete-option" onClick={() => handleDeleteModal()}>No</p>
          </div>
        </div>
      }
    </div>
  );
};

export default EditClub;