import "./Landing.css";
import OrangeBook from "../../photos/OrangeBook.jpg";

const Landing = () => {
  return(
    <div className="landing-wrapper">
      <img src={OrangeBook} className="landing-placeholder" alt="book"/>
      <div className="landing-text">
        <p className="landing-header">Bookish.</p>
        <p className="landing-description">Find your perfect book club. Browse our list of available book clubs, or sign up to make your own.</p>
        <p className="landing-description">Connect with others over your next big read. Nominate books for your club, and pose discussion questions to your club members.</p> 
      </div>
    </div>
  );
};

export default Landing;