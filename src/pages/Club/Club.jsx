import CurrentBook from "./Components/CurrentBook";
import NextBook from "./Components/NextBook";
import "./Club.css"

const Club = (props) => {
  return(
    <div className="club-wrapper">
      <div className="club-info">
        <p className="club-name-header">Science Nerds</p>
        <p className="club-description-header">A book club dedicated to all things science!</p>
        <p className="club-meeting-header">Meets via Zoom every last Thursday at 8:00PM</p>
      </div>  
      <div className="club-left-and-right">
        <div className="club-left">
          <div className="members-container">
            <div className="mobile-banner">
              <p className="members-header">Members</p>
              <div className="arrow-down"></div>
            </div>
            <div className="members-list">
              <p className="member">Polymathmatical</p>
              <p className="member">VolcanoMan</p>
              <p className="member">Philiment</p>
              <p className="member">GeigerCount</p>
              <p className="member">ItzGeorge</p>
              <p className="member">Freshfinds</p>
              <p className="member">StemmyJenny</p>
              <p className="member">RockMomma</p>
            </div>
          </div>  
          <div className="past-books-container">
            <div className="mobile-banner">
              <p className="past-books-header">Past Books</p>
              <div className="arrow-down"></div>
            </div>
            <div className="past-books-list">
              <p className="past-book">The Selfish Gene by Richard Dawkins</p>
            </div>
          </div>
        </div>
        {/* <CurrentBook /> */}
        <NextBook />
      </div>  
    </div>
  );
};

export default Club