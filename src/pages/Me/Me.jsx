import React from 'react';
import {
  //  Link,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { auth } from '../../firebase/firebase.utils';

import './Me.scss';
// import Spinner from '../../components/spinner/spinner';
const Me = ({ currentUser, history, setCurrentUser }) => {
  const handleSignout = () => {
    auth.signOut();
    setCurrentUser(null);
    history.push(`/`);
  };
  return <div className="user-profile-page main"></div>;
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (disaptch) => ({
  setCurrentUser: (user) => disaptch(setCurrentUser(user)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Me));
