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
import User from '../../components/User/User';
// import Spinner from '../../components/spinner/spinner';
const Me = ({ currentUser, history, setCurrentUser }) => {
  const handleSignout = () => {
    auth.signOut();
    setCurrentUser(null);
    history.push(`/`);
  };
  const handleEdit = () => {
    history.push('/edit-me');
  };

  return (
    <div className="user-profile-page main">
      <User
        data={{ ...currentUser }}
        handleSignout={handleSignout}
        admin
        handleEdit={handleEdit}
      />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (disaptch) => ({
  setCurrentUser: (user) => disaptch(setCurrentUser(user)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Me));
