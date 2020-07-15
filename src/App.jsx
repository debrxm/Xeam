import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import Spinner from './components/Spinner/Spinner';
/*==============================*/
/*PAGES*/
/*==============================*/
import Home from './pages/Home/Home';
import Me from './pages/Me/Me';
import EditMe from './pages/EditMe/EditMe';
import './App.scss';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';

class App extends React.Component {
  state = {
    isLoading: false,
    isShowSearch: false,
    hasError: false,
  };
  unSubscribeFromAuth = null;
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(info);
  }
  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.props.setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
    });
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
  render() {
    const { currentUser, history } = this.props;
    return (
      <div className="App">
        {history.location.pathname === '/' ? null : history.location
            .pathname === '/login' ? null : history.location.pathname ===
          '/notfound' ? null : history.location.pathname ===
          '/register' ? null : (
          <div className="showing">
            <div className="desktop">
              <header>Header</header>
            </div>
          </div>
        )}
        <div
          className={`${
            history.location.pathname === '/messages'
              ? 'message-wrapper'
              : 'wrapper'
          } `}
        >
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <Switch>
              <Route exact path="/me" component={Me} />
              <Route
                exact
                path="/edit-me"
                render={() =>
                  currentUser ? <EditMe /> : <Redirect to="/me" />
                }
              />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/" component={Home} />
            </Switch>
          )}
        </div>
        {history.location.pathname === '/' ? null : history.location
            .pathname === '/login' ? null : history.location.pathname ===
          '/register' ? null : history.location.pathname ===
          '/notfound' ? null : history.location.pathname ===
          '/user-profile' ? null : history.location.pathname ===
          '/messages' ? null : (
          <footer>FOOTER</footer>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
