import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import UserQuery from "../../queries/UserQuery";
import "./LogIn.css";

const LogIn = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  //USER INPUT STATES
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  //LOG-IN ERROR DISPLAY STATE
  const [errorDisplay, setErrorDisplay] = useState(false);

  //ACCOUNT SUCCESSFULLY CREATED STATE
  const [success, setSuccess] = useState(false);

  //FORM FUNCTIONS
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorDisplay(false);
    UserQuery.verify(user)
    .then(response => {
      if (response.errorcode === 1 ){
        setErrorDisplay(true)
        return;
      } else {
        cookies.set("TOKEN", response.token, {
          path: "/"
        });
        setSuccess(true);
        setTimeout(() => {
          navigate("/home")
        }, 2000)
      }
    });
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };


  return(
    <div className="login-wrapper">
      <p className="login-header">Log In</p>
      {success === true 
        ? <p className="signup-sucess">Success! Redirecting to home page...</p>
        : <div className="login-form">
            <form onSubmit={handleSubmit}> 
              <div className="login-form-inputs">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  className="login-input"
                  minLength="3"
                  maxLength="20"
                  required={true}
                  onChange={handleChange}
                  value={user.username}
                />
              </div>  
              <div className="login-form-inputs">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="login-input"
                  minLength="4"
                  maxLength="40"
                  required={true}
                  onChange={handleChange}
                  value={user.password}
                />
              </div>  
              <div className="login-submit">
                <input type="submit" className="submit" value="Submit"/>
              </div>  
            </form>
          </div>
      }  
      {errorDisplay === true &&
        <p className="no-match">Username and password do not match. Please try again.</p>
      }
      {success === false &&
        <p className="auth-alternative">Don't have an account with us? Click <Link to={"/signup"} className="click-here">here</Link> to sign up.</p>
      }    
    </div>
  );  
};

export default LogIn;