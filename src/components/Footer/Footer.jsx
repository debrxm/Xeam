import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import home from "../../assets/home.svg";
import addFriend from "../../assets/user-plus.svg";
import plus from "../../assets/plus.svg";
import bell from "../../assets/bell.svg";
import userIcon from "../../assets/user.svg";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import "./Footer.scss";
const Footer = ({ currentUser }) => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/home">
          <img src={home} alt="home icon" />
        </Link>
        <Link to="find-people">
          <img src={addFriend} alt=" add friend icon" />
        </Link>
        <Link to="/new-post" className="new">
          <img src={plus} alt="add post icon" />
        </Link>
        <Link to="/notifications">
          <img src={bell} alt="" />
        </Link>
        <Link to="/me">
          <img
            className="user-prof"
            src={currentUser && currentUser.profile_pic}
            alt="user icon"
          />
        </Link>
      </div>
    </footer>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(Footer);
