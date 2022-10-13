import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"
import "./Header.css"

const Header = () => {
  let navigate = useNavigate();

  const cookies = new Cookies();
  let token = cookies.get("TOKEN")

  const logout = () => {
    cookies.remove("TOKEN", {path: "/"})
    navigate("/")
  }
  
  return(
    <div className="header">
      <Link to={"/"} className="nav-items">Bookish</Link>
      {!token
        ? <div className="header-loggedout">
          <Link to={"/signup"} className="nav-items">Sign Up</Link>
          <Link to={"/login"} className="nav-items">Log In</Link>
        </div>
        : <p className="nav-items" onClick={() => logout()}>Log Out</p>
      }
    </div>
  );
};

export default Header;