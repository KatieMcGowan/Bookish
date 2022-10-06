import { Link } from "react-router-dom";
import "./Header.css"

const Header = (props) => {
  return(
    <div className="header">
      <Link to={"/"} className="nav-items">Bookish</Link>
      {props.loggedIn.loggedIn === false 
        ? <div className="header-loggedout">
          <Link to={"/signup"} className="nav-items">Sign Up</Link>
          <Link to={"/login"} className="nav-items">Log In</Link>
        </div>
        : <p className="nav-items">Log Out</p>
      }
    </div>
  );
};

export default Header;