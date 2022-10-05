import "./SignUp.css"

const SignUp = (props) => {
  return(
    <div className="signup-wrapper">
      <p className="signup-header">Sign Up</p>
      <div className="signup-form">
        <form /*onSubmit={handleSubmit}*/>
          <div className="signup-form-inputs">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="displayname"
              className="signup-input"
              minLength="1"
              maxLength="20"
              required={true}
              //onChange={handleChange}
              //value={state.name}
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
              //onChange={handleChange}
              //value={state.name}
            />
          </div>  
          <div className="signup-form-inputs">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              className="signup-input"
              minLength="4"
              maxLength="40"
              required={true}
              //onChange={handleChange}
              //value={state.name}
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