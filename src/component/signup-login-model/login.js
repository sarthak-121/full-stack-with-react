import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./style.css";
import Aux from "../../hoc/Auxillary";

const login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useRef();

  const signupHandler = async () => {
    const userdata = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(
        "https://full-stack-chat-app-121.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userdata),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.error === true) {
        error.current.innerHTML = data.message;
        return;
      }
      props.authenticate(data.data, data.token);
    } catch (e) {
      console.log(e);
    }
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    signupHandler();
  };

  return (
    <Aux>
      <form onSubmit={submitHandler}>
        <label className={classes.label}>Email</label>
        <br />
        <input
          className={classes.input_field}
          type="Email"
          onChange={emailHandler}
          placeholder="example@gmail.com"
          required
        />
        <br />
        <label className={classes.label}>Password</label>
        <br />
        <input
          className={classes.input_field}
          type="pass"
          onChange={passwordHandler}
          placeholder="password"
          required
        />
        <br />
        <small ref={error} style={{ color: "red", display: "block" }}></small>
        <button type="submit" className={classes.submit_btn}>
          Submit
        </button>
        <hr />
        <Link to="/forgot-password" style={{ color: "blue" }}>
          Forgot Password?
        </Link>
        <hr />
      </form>
    </Aux>
  );
};

export default login;
