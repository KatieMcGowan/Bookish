import "./NewClub.css"

const NewClub = (props) => {
  return(
    <div className="new-club-wrapper">
      <p className="new-club-header">New Club</p>
      <div className="new-form-form">
        <form /*onSubmit={handleSubmit}*/>
          <div className="new-form-inputs">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="displayname"
              className="new-form-input"
              minLength="2"
              maxLength="30"
              required={true}
              //onChange={handleChange}
              //value={state.name}
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
              //onChange={handleChange}
              //value={state.name}
            />
          </div>  
          <div className="new-form-inputs">
            <label htmlFor="meeting">Meeting Details</label>
            <input
              type="text"
              name="meeting"
              className="new-form-input"
              minLength="4"
              maxLength="40"
              required={true}
              //onChange={handleChange}
              //value={state.name}
            />
          </div>  
          <div className="new-form-inputs">
            <label htmlFor="members">Invite Members</label>
            <input
              type="text"
              name="members"
              className="new-form-input"
              minLength="4"
              maxLength="40"
              required={true}
              //onChange={handleChange}
              //value={state.name}
            />
          </div>  
          <div className="new-form-submit">
            <input type="submit" className="submit" value="Submit"/>
          </div>  
        </form>
      </div>
    </div>
  );
};

export default NewClub