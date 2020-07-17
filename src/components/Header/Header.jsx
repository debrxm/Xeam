import React from "react";
import { Link, withRouter } from "react-router-dom";
import chat from "../../assets/comment-dots.svg";
import arrow from "../../assets/arrow-left.svg";
import "./Header.scss";
const Header = (history) => {
  console.log(history);
  const location = history.location.pathname;
  return (
    <header className="header">
      {location === "/home" ? (
        <Link to="/home">
          <h2 className="brand">Xeam</h2>
        </Link>
      ) : (
        <img
          src={arrow}
          alt=""
          className="back"
          onClick={() => history.goBack()}
        />
      )}
      {location === "/home" && (
        <Link to="/chat">
          <img src={chat} alt="chat icon" />
        </Link>
      )}
      {location === "/me" && <h3 className="route">Me</h3>}
    </header>
  );
};

export default withRouter(Header);
