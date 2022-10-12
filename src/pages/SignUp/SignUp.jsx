import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import UserQuery from "../../queries/UserQuery";
import "./SignUp.css"

const SignUp = (props) => {
  let navigate = useNavigate()

  //USER INPUT STATES
  const [newUser, setNewUser] = useState({
    displayname: "",
    username: "",
    password: "",
  })

  //USERNAME ALREADY TAKEN DISPLAY STATE
  const [errorDisplay, setErrorDisplay] = useState(false);

  //FORM FUNCTIONS
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorDisplay(false);
    UserQuery.create(newUser)
    .then(navigate("/"))
  }

  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value
    });
  };

  console.log(newUser);
  return(
    <div className="signup-wrapper">
      <p className="signup-header">Sign Up</p>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <div className="signup-form-inputs">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="displayname"
              className="signup-input"
              minLength="1"
              maxLength="20"
              required={true}
              onChange={handleChange}
              value={newUser.displayname}
            />
          </div>  
          <div className="signup-form-inputs">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="signup-input"
              minLength="3"
              maxLength="20"
              required={true}
              onChange={handleChange}
              value={newUser.username}
            />
          </div>  
          <div className="signup-form-inputs">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="signup-input"
              minLength="4"
              maxLength="40"
              required={true}
              onChange={handleChange}
              value={newUser.password}
            />
          </div>  
          <div className="signup-submit">
            <input type="submit" className="submit" value="Submit"/>
          </div>  
        </form>
      </div>
    </div>
  );
};

export default SignUp;