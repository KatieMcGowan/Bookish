import { Link } from "react-router-dom"
import "./MyClubs.css"

const MyClubs = (props) => {
  return(
    <div className="my-clubs-wrapper">
      <p className="my-clubs-header">My Clubs</p>
      <div className="my-clubs-container">
        <div className="my-clubs-club">
          <p className="my-clubs-club-name">Science Nerds</p>
        </div>
        <div className="my-clubs-club">
          <p className="my-clubs-club-name">Queer Voices</p>
        </div>
        <div className="my-clubs-club">
          <p className="my-clubs-club-name">History Buffs</p>
        </div>
        <div className="my-clubs-club">
          <p className="my-clubs-club-name">Dystopia</p>
        </div>
      </div>
      <Link className="create-a-club" to={"/clubs/new"}>Create a club</Link>
    </div>
  );
};

export default MyClubs