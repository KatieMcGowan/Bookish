import "./LogIn.css"

const LogIn = (props) => {
  return(
    <div className="login-wrapper">
      <p className="login-header">Log In</p>
      <div className="login-form">
        <form /*onSubmit={handleSubmit}*/>
          <div className="login-form-inputs">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="displayname"
              className="login-input"
              minLength="1"
              maxLength="20"
              required={true}
              //onChange={handleChange}
              //value={state.name}
            />
          </div>  
          <div className="login-form-inputs">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              minLength="3"
              maxLength="20"
              required={true}
              //onChange={handleChange}
              //value={state.name}
            />
          </div>  
          <div className="login-form-inputs">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              className="login-input"
              minLength="4"
              maxLength="40"
              required={true}
              //onChange={handleChange}
              //value={state.name}
            />
          </div>  
          <div className="login-submit">
            <input type="submit" className="submit" value="Submit"/>
          </div>  
        </form>
      </div>
    </div>
  );  
};

export default LogIn;