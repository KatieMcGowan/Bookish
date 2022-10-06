import "./Nominate.css"

const Nominate = (props) => {
  return(
    <div className="nominate-wrapper">
      <p className="nominate-header">Nominate a Book</p>
      <div className="nominate-form">
        <form /*onSubmit={handleSubmit}*/>
          <div className="nominate-form-inputs">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="nominate-form-input"
              minLength="2"
              maxLength="30"
              required={true}
              //onChange={handleChange}
              //value={state.name}
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
              //onChange={handleChange}
              //value={state.name}
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