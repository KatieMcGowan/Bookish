import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./ManageMembers.css"

const ManageMembers = (props) => {
  return(
    <div className="manage-members-wrapper">
      <p className="manage-members-header">Manage Members</p>
      <div className="current-members-container">
        <p className="members-header">Members</p>
        <div className="current-members-list">
          <div className="manage-member">
            <FontAwesomeIcon className="icon" icon={faUserXmark}/>
            <p className="member">VolcanoMan</p>
          </div>
          <div className="manage-member">
            <FontAwesomeIcon className="icon" icon={faUserXmark}/>
            <p className="member">Philiment</p>
          </div>
          <div className="manage-member">
            <FontAwesomeIcon className="icon" icon={faUserXmark}/>
            <p className="member">GeigerCount</p>
          </div>
          <div className="manage-member">
            <FontAwesomeIcon className="icon" icon={faUserXmark}/>
            <p className="member">ItzGeorge</p>
          </div>
          <div className="manage-member">
            <FontAwesomeIcon className="icon" icon={faUserXmark}/>
            <p className="member">Freshfinds</p>
          </div>
          <div className="manage-member">
            <FontAwesomeIcon className="icon" icon={faUserXmark}/>
            <p className="member">StemmyJenny</p>
          </div>
          <div className="manage-member">
            <FontAwesomeIcon className="icon" icon={faUserXmark}/>
            <p className="member">RockMomma</p>
          </div>
        </div>
      </div>
      <div className="current-invite-container">
        <p className="members-header">Requested Members</p>
        <div className="invited-members-list">
          <div className="manage-invite">
            <FontAwesomeIcon className="icon" icon={faX}/>
            <p className="invited-member">Pinocchibro</p>
          </div>
          <div className="manage-invite">
            <FontAwesomeIcon className="icon" icon={faX}/>
            <p className="invited-member">HappyCow</p>
          </div> 
        </div>
      </div>
      <div className="invite-members-container">
        <div className="invite-header-container">
          <p className="members-header">Invite Members</p>
          <FontAwesomeIcon className="icon" icon={faUserPlus}/>
        </div>
        <div className="invite-member-form">
        <form /*onSubmit={handleSubmit}*/>
          <div className="member-invite-input">
            <input
              type="text"
              name="displayname"
              className="member-invite-input"
              //onChange={handleChange}
              //value={state.name}
            />
            <input type="submit" className="submit" value="Submit"/>
          </div>  
        </form>
      </div>
      </div>
    </div>
  );
};

export default ManageMembers