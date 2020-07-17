import React from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import CustomButton from '../../components/CustomButton/CustomButton';
import google from '../../assets/google.svg';
import './Home.scss';
const Home = () => {
  const handleGoogleLogin = () => {
    signInWithGoogle();
  };
  return (
    <div className="homepage">
      {/* <div className="background">
        <h1>X</h1>
      </div> */}
      <div className="buttons">
        <div className="google">
          <span>Login With: </span>
          <div onClick={handleGoogleLogin}>
            <CustomButton isGoogleSignIn>
              <img src={google} alt="google pic" />
              <h4>Google</h4>
            </CustomButton>
          </div>
        </div>
        <div className="register">
          <Link to="/register">
            <CustomButton>Register</CustomButton>
          </Link>
        </div>
        <div className="login">
          <Link to="/login">
            <CustomButton>Login</CustomButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
