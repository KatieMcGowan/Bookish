import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  
  let token = cookies.get("TOKEN");

  const logout = () => {
    cookies.remove("ID", {path: "/"});
    cookies.remove("TOKEN", {path: "/"});
    navigate("/");
  };
  
  return(
    <div className="header-wrapper">
      <div className="header">
        {!token 
          ? <Link to={"/"} className="nav-items">Bookish</Link>
          : <Link to={"/home"} className="nav-items">Bookish</Link>
        }
        {!token
          ? <div className="header-loggedout">
              <Link to={"/signup"} className="nav-items">Sign Up</Link>
              <Link to={"/login"} className="nav-items">Log In</Link>
            </div>
          : <div className="header-loggedout">
              {/* <Link to={"/myclubs"} className="nav-items">My Clubs</Link>
              <Link to={"/clubs"} className="nav-items">Browse Clubs</Link> */}
              <p className="nav-items" onClick={() => logout()}>Log Out</p>
            </div>  
        }
      </div>
    </div>  
  );
};

export default Header;