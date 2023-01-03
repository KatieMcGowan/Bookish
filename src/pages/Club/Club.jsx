import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { faPencil }from "@fortawesome/free-solid-svg-icons";
import Member from "./Components/Member";
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
  }, []);
  
  // PAGE STATES AND HOOKS
  const [adminCheck, setCheck] = useState({
    isAdmin: false,
    adminName: "",
    adminId: "",
  });

  const [userId, setUser] = useState("");

  const [clubBasics, setBasics] = useState({
    clubname: "",
    description: "", 
    meetup: "",
    admin: "",
    members: [],
  });

  const [currentBook, setCurrentBook] = useState("");

  const [pastbooks, setPastBooks] = useState([]);

  const [questions, setQuestions] = useState([]);

  const [usersCompleted, setCompleted] = useState([]);

  const [nominations, setNominations] = useState([]);
  
  const [newBook, setNewBook] = useState("");

  const [viewNominations, setView] = useState(false);

  const [book, setBook] = useState({
    title: "",
    author: "",
  });

  const clubId = useParams().clubid;

  useEffect(() => {
    let token = {token: cookies.get("TOKEN")}
    ClubQuery.show(clubId)
    .then(club => {
      UserQuery.getid(token)
      .then(user => {
        setUser(user.userId)
        UserQuery.show(club.admin)
        .then(admin => {
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
        })
      })
    })
  }, []);

  useEffect(() => {
    if (!currentBook) {
      return;
    } else {
      BookQuery.show(currentBook)
      .then(book => {
        setBook({
          title: book.title,
          author: book.author
        })
      })
    }
  }, [currentBook]);

  const handleEditRedirect = () => {
    navigate(`/clubs/${clubId}/edit`)
  };

  //STATES AND FUNCTIONS FOR MEMBER LEAVING CLUB
  const [leaveConfirm, setConfirm] = useState(false);

  const handleMemberLeaving = () => {
    ClubQuery.deletefromarray(clubId, {member: userId})
    .then(navigate("/home"))
  };

  const handleLeaveModal = () => {
    leaveConfirm === false ? setConfirm(true) : setConfirm(false)
  };

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
        {(leaveConfirm === false && adminCheck.isAdmin === false) &&
          <p className="leave-link" onClick={() => handleLeaveModal()}>Leave this club</p>
        }  
        {leaveConfirm === true && 
          <div className="delete-modal">
            <p>Are you sure you want to leave this club?</p>
            <div className="delete-options">
              <p className="delete-option" onClick={() => handleMemberLeaving()}>Yes</p>
              <p className="delete-option" onClick={() => handleLeaveModal()}>No</p>
            </div>
          </div>
        }
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
                <FontAwesomeIcon icon={faCrown} />
                <p className="member">{adminCheck.adminName}</p>
              </div>
              {clubBasics.members.map((member, index) => {
                return <Member
                          key={index}
                          member={member}
                          adminId={adminCheck.adminId}
                          isAdmin={adminCheck.isAdmin}
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
        {(viewNominations === false && newBook === false) 
          ? <CurrentBook 
              currentbook={book}
              members={clubBasics.members}
              userscompleted={usersCompleted}
              setCurrentBook={setCurrentBook}
              setNewBook={setNewBook}
              setQuestions={setQuestions}
              questions={questions}
              id={clubId}
              adminCheck={adminCheck}
              isAdmin={adminCheck.isAdmin}
              setView={setView}
            />
          : <NextBook
              currentBook={currentBook}
              setCurrentBook={setCurrentBook}
              newBook={newBook}
              setNewBook={setNewBook}
              setQuestions={setQuestions}
              setNominations={setNominations}
              setCompleted={setCompleted}
              pastbooks={pastbooks}
              nominations={nominations}
              isAdmin={adminCheck.isAdmin}
              setView={setView}
            />
        }
      </div>  
    </div>
  );
};

export default Club;

//What are the conditions in which we would have Next Book 
//viewNominations === true
//newBook === true

//What are the conditions in which we would have Current Book
//viewNominations === false
//newBook === false