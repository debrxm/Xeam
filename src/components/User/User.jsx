import React, { useState } from "react";
import location from "../../assets/location-arrow.svg";
import editDot from "../../assets/edit-dot.svg";
import "./User.scss";

const User = ({ data, handleSignout, admin, handleEdit }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [active, setActive] = useState("posts");
  const handleToggleShowEdit = () => {
    setShowEdit(!showEdit);
  };
  const handleChangeActive = (e) => {
    setActive(e);
  };

  return (
    <div className="user-view-container">
      <div className="user-view">
        <div className="user">
          <div className="profile-pic">
            <img src={data.profile_pic} alt="profile pic" />
          </div>
          <div className="ctrl">
            <h4 className="name">{data.displayName}</h4>
            <div className="location">
              <img src={location} alt="location" />
              {/*<span>{data.location}</span>*/}
              <span>Lagos</span>
            </div>
          </div>
          <div className="edit-dot">
            <img src={editDot} alt="edit dots" onClick={handleToggleShowEdit} />
            {showEdit && (
              <div className="logout-edit">
                <h5 onClick={handleEdit} className="edit">
                  Edit
                </h5>
                <h5 onClick={handleSignout} className="logout">
                  Logout
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="feed-friends">
        <span className="friends feed-friends-btn">{0} Friends</span>
        {!admin && <span className="message feed-friends-btn">Message</span>}
      </div>
      <div className="user-nav">
        <span
          className="post user-nav-btn"
          style={
            active === "posts" ? { color: "#00ffa9", fontWeight: 500 } : {}
          }
          onClick={handleChangeActive.bind(this, "posts")}
        >
          {0} Posts
        </span>
        <span className="seperator">|</span>
        <span
          className="event user-nav-btn"
          style={
            active === "events" ? { color: "#00ffa9", fontWeight: 500 } : {}
          }
          onClick={handleChangeActive.bind(this, "events")}
        >
          {0} Events
        </span>
      </div>
      <br />
    </div>
  );
};

export default User;
