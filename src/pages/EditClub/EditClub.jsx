import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditClub.css"

const EditClub = (props) => {
  return(
    <div className="edit-club-wrapper">
      <p className="edit-club-header">Edit Club</p>
      <div className="edit-form-form">
        <form /*onSubmit={handleSubmit}*/>
          <div className="edit-form-inputs">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="displayname"
              className="edit-form-input"
              minLength="2"
              maxLength="30"
              required={true}
              //onChange={handleChange}
              //value={state.name}
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
              //onChange={handleChange}
              //value={state.name}
            />
          </div>  
          <div className="edit-form-inputs">
            <label htmlFor="meeting">Meeting Details</label>
            <input
              type="text"
              name="meeting"
              className="edit-form-input"
              minLength="4"
              maxLength="40"
              required={true}
              //onChange={handleChange}
              //value={state.name}
            />
          </div>  
          <div className="edit-form-submit">
            <input type="submit" className="submit" value="Submit"/>
          </div>  
        </form>
      </div>
      <p className="delete-club">Delete club</p>
    </div>
  );
};

export default EditClub