import React from 'react';
import { Link } from 'react-router-dom';
import chat from '../../assets/comment-dots.svg';
import './Header.scss';
const Header = () => {
  return (
    <header className="header">
      <Link to="/home">
        <h2 className="brand">Xeam</h2>
      </Link>
      <Link to="/chat">
        <img src={chat} alt="chat icon" />
      </Link>
    </header>
  );
};

export default Header;
