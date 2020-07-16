import React from 'react';
import './User.scss';

const User = ({ data, handleSignout, admin, handleEdit }) => {
  return (
    <div className="user-view-container">
      <div className="cover-pic">
        <img src={data.cover} alt="cover pic" />
      </div>
      <div className="user-view">
        <div className="user">
          <div className="profile-pic">
            <img src={data.profile_pic} alt="profile pic" />
          </div>
          <div className="ctrl">
            <h4 className="name">{data.displayName}</h4>
            {admin ? (
              <div className="ctrl-buttons">
                <button className="ctrl-edit ctrl-btn" onClick={handleEdit}>
                  Edit
                </button>
                <button
                  className="ctrl-logout ctrl-btn"
                  onClick={handleSignout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="add-remove"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
