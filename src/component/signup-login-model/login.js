import React, { useState } from "react";

import classes from "./style.css";
import Aux from "../../hoc/Auxillary";

const login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      if (!response.ok) {
        throw new Error(response);
      }
      const data = await response.json();
      props.authenticate(data);
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
        <h6 className={classes.error_msg}></h6>
        <button type="submit" className={classes.submit_btn}>
          Submit
        </button>
        <hr />
      </form>
    </Aux>
  );
};

export default login;
