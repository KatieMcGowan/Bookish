import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { faPencil }from "@fortawesome/free-solid-svg-icons";
import Member from "./Components/Member"
import CurrentBook from "./Components/CurrentBook";
import NextBook from "./Components/NextBook";
import PastBook from "./Components/PastBook";
import ClubQuery from "../../queries/ClubQuery";
import UserQuery from "../../queries/UserQuery";
import BookQuery from "../../queries/BookQuery";
import "./Club.css";

const Club = () => {
  // AUTH TOKEN CHECK
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
  
  // PAGE STATES AND HOOKS
  const [adminCheck, setCheck] = useState({
    isAdmin: false,
    adminName: "",
    adminId: "",
  })

  // const [club, setClub] = useState({
  //   clubname: "",
  //   description: "", 
  //   meetup: "",
  //   admin: "",
  //   members: [],
  //   currentbook: "",
  //   pastbooks: [],
  //   questions: [],
  //   userscompleted: [],
  //   nominations: [],
  //   newbook: "",
  // });

  const [clubBasics, setBasics] = useState({
    clubname: "",
    description: "", 
    meetup: "",
    admin: "",
    members: [],
  })

  const [currentBook, setCurrentBook] = useState("")

  const [pastbooks, setPastBooks] = useState([])

  const [questions, setQuestions] = useState([])

  const [usersCompleted, setCompleted] = useState([])

  const [nominations, setNominations] = useState([])
  
  const [newBook, setNewBook] = useState("")

  const [book, setBook] = useState({
    title: "",
    author: "",
  })

  const clubid = useParams().clubid

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")}
    ClubQuery.show(clubid)
    .then(club => {
      UserQuery.getid(token)
      .then(user => {
        UserQuery.show(club.admin)
        .then(admin => {
          if (!club.currentbook) {
            if (club.admin === user.userId) {
              setCheck({
                isAdmin: true,
                adminName: user.userDisplayName,
                adminId: user.userId
              })
            } else {
              setCheck({
                isAdmin: false,
                adminName: admin.displayname,
                adminId: admin._id
              })
            }
            setBasics({
              clubname: club.clubname,
              description: club.description, 
              meetup: club.meetup,
              admin: club.admin,
              members: club.members,
            })
            setCurrentBook(club.currentbook)
            setPastBooks(club.pastbooks)
            setQuestions(club.questions)
            setCompleted(club.userscompleted)
            setNominations(club.nominations)
            setNewBook(club.newbook)
          } else {
            BookQuery.show(club.currentbook) 
            .then(book => {
              if (club.admin === user.userId) {
                setCheck({
                  isAdmin: true,
                  adminName: user.userDisplayName,
                  adminId: user.userId
                })
              } else {
                setCheck({
                  isAdmin: false,
                  adminName: admin.displayname,
                  adminId: admin._id
                })
              }
              setBasics({
                clubname: club.clubname,
                description: club.description, 
                meetup: club.meetup,
                admin: club.admin,
                members: club.members,
              })
              setCurrentBook(club.currentbook)
              setPastBooks(club.pastbooks)
              setQuestions(club.questions)
              setCompleted(club.userscompleted)
              setNominations(club.nominations)
              setNewBook(club.newbook)
              setBook({
                ...book
              })
            })
          }
        })
      })
    })
  }, [])

  const handleEditRedirect = () => {
    navigate(`/clubs/${clubid}/edit`)
  }

  return(
    <div className="club-wrapper">
      <div className="club-info">
        <div className="edit-club-container">
          {adminCheck.isAdmin === true &&
            <FontAwesomeIcon icon={faPencil} onClick={() => handleEditRedirect()} />
          }  
          <p className="club-name-header">{clubBasics.clubname}</p>
        </div>
        <p className="club-description-header">{clubBasics.description}</p>
        <p className="club-meeting-header">Meet up: {clubBasics.meetup}</p>
      </div>  
      <div className="club-left-and-right">
        <div className="club-left">
          <div className="members-container">
            <div className="mobile-banner">
              <p className="club-members-header">Members</p>
              <div className="arrow-down"></div>
            </div>
            <div className="members-list">
              <div className="admin-member">
                <p className="member">{adminCheck.adminName}</p>
                <FontAwesomeIcon icon={faCrown} />
              </div>
              {clubBasics.members.map((member, index) => {
                return <Member
                          key={index}
                          member={member}
                          adminId={adminCheck.adminId}
                      />  
              })}
            </div>
            </div>
          <div className="past-books-container">
            <div className="mobile-banner">
              <p className="past-books-header">Past Books</p>
              <div className="arrow-down"></div>
            </div>
            {pastbooks.map((pastbook, index) => {
              return <PastBook
                      key={index}
                      pastbook={pastbook}
                    /> 
            })}
          </div>
        </div>
        {newBook === false
          ? <CurrentBook 
              currentbook={book}
              members={clubBasics.members}
              userscompleted={usersCompleted}
              setCurrentBook={setCurrentBook}
              setNewBook={setNewBook}
              questions={questions}
              id={clubid}
              adminCheck={adminCheck}
            />
          : <NextBook
              setCurrentBook={setCurrentBook}
              setNewBook={setNewBook}
              nominations={nominations}
              isAdmin={adminCheck.isAdmin}
            />
        }
      </div>  
    </div>
  );
};

export default Club