const Club = (props) => {
  return(
    <div className="club-wrapper">
      <p className="club-name-header">Science Nerds</p>
      <p className="club-description-header">A book club dedicated to all things science!</p>
      <p className="club-meeting-header">Meets via Zoom every last Thursday at 8:00PM</p>
      <div className="club-left">
        <div className="members-container">
          <p className="members-header"></p>
        </div>
      </div>
    </div>
  );
};

export default Club