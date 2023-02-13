import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import BookQuery from "../../../queries/BookQuery";
import ClubQuery from "../../../queries/ClubQuery";

const Nominated = (props) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
  });

  const [deleteConfirm, setConfirm] = useState(false);

  useEffect(() => {
    BookQuery.show(props.nominated)
    .then(book => {
      setBook({
        title: book.title,
        author: book.author
      })
    });
  }, [props.nominated]);

  const handleDeleteModal = () => {
    deleteConfirm === false ? setConfirm(true) : setConfirm(false)
  };

  const handleNominationDelete = () => {
    ClubQuery.deletefromarray(props.clubId, {nomination: props.nominated})
    .then(props.setNominations(props.nominations.filter(nomination => nomination !== props.nominated)))
    .then(setConfirm(false))
  };

  return(
    <div className="nomination-container">
      <div className="nominated-book">
        <p className="nominated-title-and-author">{book.title} by {book.author}</p>
        {props.isAdmin === true &&
          <FontAwesomeIcon className="check" icon={faX} onClick={() => handleDeleteModal()}/>
        }
      </div>
      {deleteConfirm === true &&
        <div className="delete-modal">
          <p>Are you sure you want to delete this nomination?</p>
          <div className="delete-options">
            <p className="delete-option" onClick={() => handleNominationDelete()}>Yes</p>
            <p className="delete-option" onClick={() => handleDeleteModal()}>No</p>
          </div>
        </div>
      }
  </div>
  );
};

export default Nominated;