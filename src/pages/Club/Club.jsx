import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownUpAcrossLine, faCrown } from "@fortawesome/free-solid-svg-icons";
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

  const clubId = useParams().clubid;

  const cookies = new Cookies();

  // PAGE STATES AND HOOKS
  const [userId, setUser] = useState("");

  const [adminId, setAdminId] = useState("");

  const [adminName, setAdminName] = useState("");

  const [isAdmin, setIsAdmin] = useState(false)

  const [clubBasics, setBasics] = useState({
    clubname: "",
    description: "", 
    meetup: "",
    admin: "",
    members: [],
  });

  const [currentBook, setCurrentBook] = useState("");
  
  const [pastBooks, setPastBooks] = useState([]);

  const [questions, setQuestions] = useState([]);

  const [usersCompleted, setCompleted] = useState([]);

  const [nominations, setNominations] = useState([]);
  
  const [nextBook, setNextBook] = useState("");

  const [viewNominations, setView] = useState(false);

  const [book, setBook] = useState({
    title: "",
    author: "",
  });

  //Refactor to have it check if user is a part of club
  useEffect(() => {
    let token = {token: cookies.get("TOKEN")}
    if (token) {
      UserQuery.getid(token)
      .then(user => {
        setUser(user.userId)
      });  
      return;
    } else {
      navigate("/login")
    };
  }, [cookies, navigate]);
  
  useEffect(() => {
    ClubQuery.show(clubId)
    .then(club => {
      setAdminId(club.admin);
      setBasics({
        clubname: club.clubname,
        description: club.description, 
        meetup: club.meetup,
        admin: club.admin,
        members: club.members,
      })
      setCurrentBook(club.currentbook)
      setPastBooks(club.pastbooks.reverse())
      setQuestions(club.questions)
      setCompleted(club.userscompleted)
      setNominations(club.nominations)
      setNextBook(club.nextbook)
    })
  }, [clubId]);

  useEffect(() => {
    if (adminId) {
      UserQuery.show(adminId)
      .then(admin => {
        setAdminName(admin.displayname)
      })
      if (adminId === userId) {
        setIsAdmin(true)
      }
    }
  }, [adminId, userId]);

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
    };
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
          {isAdmin === true &&
            <FontAwesomeIcon icon={faPencil} onClick={() => handleEditRedirect()} />
          }  
          <p className="club-name-header">{clubBasics.clubname}</p>
        </div>
        <p className="club-description-header">{clubBasics.description}</p>
        <p className="club-meeting-header">Meet up: {clubBasics.meetup}</p>
        {(leaveConfirm === false && isAdmin === false) &&
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
              {/* <div className="arrow-down"></div> */}
            </div>
            <div className="members-list">
              <div className="admin-member">
                <FontAwesomeIcon icon={faCrown} />
                <p className="member">{adminName}</p>
              </div>
              {clubBasics.members.map((member, index) => {
                return <Member
                          key={index}
                          member={member}
                          adminId={adminId}
                          isAdmin={isAdmin}
                      />  
              })}
            </div>
            </div>
          <div className="past-books-container">
            <div className="mobile-banner">
              <p className="past-books-header">Past Books</p>
              {/* <div className="arrow-down"></div> */}
            </div>
            <div className="past-books-list">
              {pastBooks.map((pastBook, index) => {
                return <PastBook
                          key={index}
                          pastBook={pastBook}
                        /> 
              })}
            </div>
          </div>
        </div>
        {(viewNominations === false && nextBook === false) 
          ? <CurrentBook 
              currentbook={book}
              members={clubBasics.members}
              userscompleted={usersCompleted}
              setCurrentBook={setCurrentBook}
              setNextBook={setNextBook}
              setQuestions={setQuestions}
              questions={questions}
              id={clubId}
              isAdmin={isAdmin}
              setView={setView}
            />
          : <NextBook
              currentBook={currentBook}
              setCurrentBook={setCurrentBook}
              nextBook={nextBook}
              setNextBook={setNextBook}
              setQuestions={setQuestions}
              setNominations={setNominations}
              setCompleted={setCompleted}
              pastBooks={pastBooks}
              setPastBooks={setPastBooks}
              nominations={nominations}
              isAdmin={isAdmin}
              setView={setView}
            />
        }
      </div>  
    </div>
  );
};

export default Club;