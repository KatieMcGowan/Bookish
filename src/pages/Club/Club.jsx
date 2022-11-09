import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import Member from "./Components/Member"
import CurrentBook from "./Components/CurrentBook";
import NextBook from "./Components/NextBook";
import PastBook from "./Components/PastBook";
import ClubQuery from "../../queries/ClubQuery";
import UserQuery from "../../queries/UserQuery";
import "./Club.css";

const Club = () => {
  //AUTH TOKEN CHECK
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    let token = cookies.get("TOKEN")
    if (token) {
      return
    } else {
      navigate("/login")
    }
  }, [])
  
  const [adminCheck, setCheck] = useState(false)

  //Club states
  const [club, setClub] = useState({
    // clubname: "",
    // description: "", 
    // meetup: "",
    // admin: "",
    members: [],
    currentbook: "",
    pastbooks: [],
    questions: [],
    userscompleted: [],
    nominations: [],
    newbook: "",
  });

  const [clubBasics, setBasics] = useState({
    clubname: "",
    description: "", 
    meetup: "",
    admin: "",
  })

  const [members, setMembers] = useState([])

  const [initiatevote, setInitiative] = useState(false);

  const clubid = useParams().clubid

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")}
    ClubQuery.show(clubid)
    .then(club => {
      UserQuery.getid(token)
      .then(user => {
        if (club.admin === user.userId) {
          setCheck(true)
        }
        setBasics({
          clubname: club.clubname,
          description: club.description,
          meetup: club.meetup,
          admin: user.userName
        })
        setClub({
          // clubname: club.clubname,
          // description: club.description,
          // meetup: club.meetup,
          // admin: club.admin,
          members: club.members,
          currentbook: club.currentbook,
          pastbooks: club.pastbooks,
          questions: club.questions,
          userscompleted: club.userscompleted,
          nominations: club.nominations,
        })
      })
    })
  }, [])

  return(
    <div className="club-wrapper">
      <div className="club-info">
        <p className="club-name-header">{clubBasics.clubname}</p>
        <p className="club-description-header">{clubBasics.description}</p>
        <p className="club-meeting-header">Meet up: {clubBasics.meetup}</p>
      </div>  
      <div className="club-left-and-right">
        <div className="club-left">
          <div className="members-container">
            <div className="mobile-banner">
              <p className="members-header">Members</p>
              <div className="arrow-down"></div>
            </div>
            <div className="members-list">
              <div className="admin-member">
                <p className="member">{clubBasics.admin}</p>
                <FontAwesomeIcon icon={faCrown} />
              </div>
              {club.members.map((member, index) => {
                return <Member
                          key={index}
                          member={member}
                        
                      />  
              })}
            </div>
            </div>
            {/* <div className="members-list">
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
            {club.pastbooks.map((pastbook, index) => {
              return <PastBook
                      key={index}
                      pastbook={pastbook}
                    /> 
            })}
            {/* <div className="past-books-list">
              <p className="past-book">The Selfish Gene by Richard Dawkins</p>
            </div> */}
          </div>
        </div>
        <CurrentBook 
          currentbook={club.currentbook}
          members={club.members}
          userscompleted={club.userscompleted}
          questions={club.questions}
          id={clubid}
          setClub={setClub}
          adminCheck={adminCheck}
        />
        {/* <NextBook /> */}
      </div>  
    </div>
  );
};

export default Club