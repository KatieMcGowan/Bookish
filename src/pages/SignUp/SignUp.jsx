import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import UserQuery from "../../queries/UserQuery";
import "./SignUp.css"

const SignUp = () => {
  let navigate = useNavigate();

  //USER INPUT STATES
  const [newUser, setNewUser] = useState({
    displayname: "",
    username: "",
    password: "",
  });

  //"USERNAME ALREADY TAKEN" DISPLAY STATE
  const [errorDisplay, setErrorDisplay] = useState(false);

  //ACCOUNT SUCCESSFULLY CREATED STATE
  const [success, setSuccess] = useState(false)

  //FORM FUNCTIONS
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorDisplay(false);
    UserQuery.create(newUser)
    .then(response => {
      if (response.errorcode === 1 ){
        setErrorDisplay(true)
        return;
      } else {
        setSuccess(true)
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      }
    })
  }

  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value
    });
  };

  return(
    <div className="signup-wrapper">
      <p className="signup-header">Sign Up</p>
      {success === true 
        ? <p className="signup-sucess">Success! Redirecting to log in page...</p>
        : <div className="signup-form">
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
      }
      {errorDisplay === true &&
        <p className="username-taken">Username is already taken, please choose another one.</p>
      }
      {success === false &&
        <p className="auth-alternative">Already have an account with us? Click <Link to={"/login"} className="click-here">here</Link> to log in.</p>  
      }
      {/* <div className="signup-form">
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
      </div> */}
      {/* {errorDisplay === true &&
        <p className="username-taken">Username is already taken, please choose another one.</p>
      }
      <p className="auth-alternative">Already have an account with us? Click <Link to={"/login"} className="click-here">here</Link> to log in.</p> */}
    </div>
  );
};

export default SignUp;