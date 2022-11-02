import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Member from "./Components/Member"
import CurrentBook from "./Components/CurrentBook";
import NextBook from "./Components/NextBook";
import ClubQuery from "../../queries/ClubQuery";
import "./Club.css";

const Club = () => {
  const [club, setClub] = useState({
    clubname: "",
    description: "", 
    meetup: "",
    admin: "",
    members: [],
    currentbook: "",
    pastbooks: [],
    questions: [],
    userscompleted: [],
    nominations: [],
  });

  const clubid = useParams().clubid

  useEffect(() => {
    ClubQuery.show(clubid)
    .then(response => {
      setClub({
        clubname: response.clubname,
        description: response.description,
        meetup: response.meetup,
        admin: response.admin,
        members: response.members,
        currentbook: response.currentbook,
        pastbooks: response.pastbooks,
        question: response.questions,
        userscompleted: response.userscompleted,
        nomination: response.nominations,
      })
    })
  }, [])


  return(
    <div className="club-wrapper">
      <div className="club-info">
        <p className="club-name-header">{club.clubname}</p>
        <p className="club-description-header">{club.description}</p>
        <p className="club-meeting-header">{club.meetup}</p>
      </div>  
      <div className="club-left-and-right">
        <div className="club-left">
          {club.members.map((member, index) => {
            return <Member
                      key={index}
                      member={member}
                  />  
          })}
          {/* <div className="members-container">
            <div className="mobile-banner">
              <p className="members-header">Members</p>
              <div className="arrow-down"></div>
            </div>
            <div className="members-list">
              <div className="admin-member">
                <p className="member">Polymathmatical</p>
                <FontAwesomeIcon icon={faCrown} />
              </div>
              <p className="member">VolcanoMan</p>
              <p className="member">Philiment</p>
              <p className="member">GeigerCount</p>
              <p className="member">ItzGeorge</p>
              <p className="member">Freshfinds</p>
              <p className="member">StemmyJenny</p>
              <p className="member">RockMomma</p>
            </div>
          </div>   */}
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
        <CurrentBook />
        {/* <NextBook /> */}
      </div>  
    </div>
  );
};

export default Club