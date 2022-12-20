import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import UserQuery from "../../queries/UserQuery";
import ClubQuery from "../../queries/ClubQuery"
import Cookies from "universal-cookie";
import SearchBooks from "../Nominate/Components/SearchBooks";
import "./NewClub.css"

const NewClub = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  
  const [clubAdmin, setAdmin] = useState("")

  const [newClub, setClub] = useState({
    clubname: "",
    description: "",
    meetup: "",
    admin: "",
    members: [],
    pastbooks: [],
    questions: [],
    userscompleted: [],
    newbook: "false",
    nominations: [],
  })

  const [clubId, setClubId] = useState("")

  const [haveBook, setHaveBook] = useState(false)

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")};
    if (token.token !== undefined) {
      UserQuery.getid(token)
      .then(response => {
        setAdmin(response.userId)
      })
    } else {
      navigate("/login")
    };
  });

  //"CLUB NAME ALREADY TAKEN" DISPLAY STATE
  const [errorDisplay, setErrorDisplay] = useState(false);

  //FORM FUNCTIONS
  const convertString = (string) => {
    if (string === "true") {
      string = true
      return string;
    } else if (string === "false") {
      string = false
      return string;
    } else return;
  }

  const handleFirstSubmit = (event) => {
    event.preventDefault();
    setErrorDisplay(false);
    newClub.admin = clubAdmin;
    newClub.members.push(clubAdmin);
    newClub.newbook = convertString(newClub.newbook);
    if (newClub.newbook === true) {
      ClubQuery.create(newClub)
      .then(club => {
        if (club.errorcode === 1 ){
          setErrorDisplay(true)
          return;
        } else {
          navigate(`/clubs/${club._id}/nominate`)
        }
      })
    } else {
      ClubQuery.create(newClub)
      .then(club => {
        if (club.errorcode === 1) {
          setErrorDisplay(true);
          return;
        } else {
          setHaveBook(true)
          setClubId(club._id)
        }
      });  
    };
  };

  //FUNCTION PASSED IF USER HAS ALREADY CHOSEN FIRST BOOK
  const handleSecondSubmit = (clubId, bookId) => {
    ClubQuery.update(clubId, {currentbook: bookId})
    .then(navigate(`/clubs/${clubId}`))
  }
  
  const handleChange = (event) => {
    setClub({
      ...newClub,
      [event.target.name]: event.target.value
    });
  };
  
  return(
    <div className="new-club-wrapper">
      <p className="new-club-header">New Club</p>
      <div className="new-form-form">
      {haveBook === false &&
        <form onSubmit={handleFirstSubmit}>
          <div className="new-form-inputs">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="clubname"
              className="new-form-input"
              minLength="2"
              maxLength="30"
              required={true}
              onChange={handleChange}
              value={newClub.clubname}
            />
          </div>  
          <div className="new-form-inputs">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              className="new-form-input"
              minLength="3"
              maxLength="200"
              required={true}
              onChange={handleChange}
              value={newClub.description}
            />
          </div>  
          <div className="new-form-inputs">
            <label htmlFor="meeting">Meeting Details</label>
            <input
              type="text"
              name="meetup"
              className="new-form-input"
              minLength="4"
              maxLength="100"
              required={true}
              onChange={handleChange}
              value={newClub.meetup}
            />
          </div>  
            <div className="new-form-inputs">
              <div className="newbook-radio-container">
                <p>Do you have a book to read?</p>
                <div className="newbook-radio-option">
                  <input 
                    type="radio" 
                    className="togglecategory" 
                    name="newbook"
                    value={false}
                    onChange={handleChange}
                    defaultChecked
                  />
                  <label htmlFor="title">Yes, we have already chosen one.</label>
                </div>
                <div className="newbook-radio-option">
                  <input 
                    type="radio" 
                    className="togglecategory" 
                    name="newbook" 
                    value={true}
                    onChange={handleChange}
                  />
                  <label htmlFor="author">No, our members will nominate books to read.</label>
                </div>
              </div>
            </div>
          <div className="new-form-submit">
            <input type="submit" className="submit" value="Submit"/>
          </div>  
        </form>
      }
      </div>
      {errorDisplay === true &&
          <p className="clubname-taken">Club name is already taken, please choose another one.</p>
        }
      {haveBook === true &&
        <SearchBooks
          path={1}
          handleSecondSubmit={handleSecondSubmit}
          clubId={clubId}
        />
        // : <SearchBooks
        //     path={2}
        //   />  
      }  
    </div>
  );
};

export default NewClub