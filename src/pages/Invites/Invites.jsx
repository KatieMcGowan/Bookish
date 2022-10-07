import "./Invites.css"

const Invites = (props) => {
  return(
    <div className="invites-wrapper">
      <p className="invites-header">Invites Received</p>
      <div className="invites-category-container">
        {/* <p className="invites-category-header">Received</p> */}
        <div className="invite-club">
          <div className="invite-name-and-options">
            <p className="invite-club-name">Bay Area Bookies</p>
            <p className="invite-status">Pending</p>
          </div>
          <div className="invite-blurb-and-meeting">
            <p className="invite-club-blurb">A club dedicated to Bay Area writers and thinkers</p>
            <p className="invite-club-meeting">Meet at Revielle Coffee Co. every first Sunday of the month at 2:00PM.</p>
          </div>
        </div>
        <div className="invite-club">
          <div className="invite-name-and-options">
            <p className="invite-club-name">Bay Area Bookies</p>
            <p className="invite-status">Pending</p>
          </div>
          <div className="invite-blurb-and-meeting">
            <p className="invite-club-blurb">A club dedicated to Bay Area writers and thinkers</p>
            <p className="invite-club-meeting">Meet at Revielle Coffee Co. every first Sunday of the month at 2:00PM.</p>
          </div>
        </div>
      </div>  
      <p className="invites-header">Invites Sent</p>
      <div className="invites-category-container">
        {/* <p className="invites-category-header">Sent</p> */}
        <div className="invite-club">
          <div className="invite-name-and-options">
            <p className="invite-club-name">Bay Area Bookies</p>
            <p className="invite-status">Pending</p>
          </div>
          <div className="invite-blurb-and-meeting">
            <p className="invite-club-blurb">A club dedicated to Bay Area writers and thinkers</p>
            <p className="invite-club-meeting">Meet at Revielle Coffee Co. every first Sunday of the month at 2:00PM.</p>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Invites