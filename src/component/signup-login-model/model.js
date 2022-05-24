import React, { useState } from "react";

import Aux from "../../hoc/Auxillary";
import classes from "./style.css";
import Signup from "./signup";
import Login from "./login";

const model = (props) => {
  const [signupBtnStyle, setSignupBtnStyle] = useState([
    classes.toggel_btn,
    classes.red,
  ]);
  const [loginBtnStyle, setLoginBtnStyle] = useState([classes.toggel_btn]);
  const [toggel, setToggle] = useState(false);

  const signupHandler = () => {
    setSignupBtnStyle([classes.toggel_btn, classes.red]);
    setLoginBtnStyle([classes.toggel_btn]);
    setToggle(false);
  };

  const loginHandler = () => {
    setSignupBtnStyle([classes.toggel_btn]);
    setLoginBtnStyle([classes.toggel_btn, classes.red]);
    setToggle(true);
  };

  return (
    <Aux>
      {toggel ? (
        <Login authenticate={props.authenticate} />
      ) : (
        <Signup authenticate={props.authenticate} />
      )}
      <div className={classes.toggel}>
        <button onClick={signupHandler} className={signupBtnStyle.join(" ")}>
          Sign Up
        </button>
        <button onClick={loginHandler} className={loginBtnStyle.join(" ")}>
          Log In
        </button>
      </div>
    </Aux>
  );
};

export default model;
