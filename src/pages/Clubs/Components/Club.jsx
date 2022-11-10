const Club = (props) => {
  console.log(props)
  return(
    <div className="clubs-individual-club">
      <div className="clubs-club-name-and-invite-status">
        <p className="clubs-club-name">{props.club.clubname}</p>
        <p className="clubs-club-invite-status">Pending</p>
      </div>
      <div className="clubs-club-blurb-and-meeting">
        <p className="clubs-club-blurb">{props.club.description}</p>
        <p className="clubs-club-meeting">{props.club.meetup}</p>
      </div>
    </div>
  );
};

export default Club;