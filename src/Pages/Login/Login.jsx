import React, { useContext } from "react";
import { useNavigate } from "react-router";

import "./Login.css";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

import { auth, googleAuth, db } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../../images/logo.png";
import { FcGoogle } from "react-icons/fc";
function Login() {
  const { currentUser } = useContext(AuthContext);
  const nav = useNavigate();

  const login = async () => {
    // signInWithPopup(auth, googleAuth)
    //   .then((result) => {
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     const user = result.user;
    //     nav("/");
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
    signInWithRedirect(auth, googleAuth);
    await getRedirectResult(auth)
      .then((result) => {
        nav("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="login--container">
      <div className="login--form">
        <img className="form--logo" src={logo} alt="Instagram Logo" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="cta--btn login--btn" type="submit">
          Log In
        </button>
        <div className="split--container">
          <div className="line"></div>
          <div className="mid">OR</div>
          <div className="line"></div>
        </div>
        <button onClick={login} className="cta--btn google--btn" type="submit">
          <FcGoogle className="google--icon" /> Log in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
