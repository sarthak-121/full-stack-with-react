import React, { useRef } from "react";

import classes from "./style.css";

const signup = (props) => {
  const username = useRef();
  const email = useRef();
  const pass = useRef();
  const confirmPass = useRef();
  const error = useRef();

  const signupHandler = async (event) => {
    event.preventDefault();
    error.current.innerHTML = "";

    if (pass.current.value !== confirmPass.current.value) {
      error.current.innerHTML = "Password did not match";
      return;
    }

    try {
      const userdata = {
        email: email.current.value,
        username: username.current.value,
        password: pass.current.value,
      };

      const response = await fetch(
        `https://full-stack-chat-app-121.herokuapp.com/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userdata),
        }
      );

      const data = await response.json();
      if (data.error === true) {
        error.current.innerHTML = data.message;
        return;
      }
      console.log(data);
      props.authenticate(data.data, data.token);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form onSubmit={signupHandler} autoComplete="off">
      <label className={classes.label}>Username</label>
      <br />
      <input
        className={classes.input_field}
        type="username"
        placeholder="Username"
        required
        ref={username}
      />
      <br />
      <label className={classes.label}>Email</label>
      <br />
      <input
        className={classes.input_field}
        type="Email"
        placeholder="example@gmail.com"
        required
        ref={email}
      />
      <br />
      <label className={classes.label}>Password</label>
      <br />
      <input
        className={classes.input_field}
        type="pass"
        placeholder="password"
        required
        ref={pass}
      />
      <br />
      <label className={classes.label}>Confirm Password</label>
      <br />
      <input
        className={classes.input_field}
        type="pass"
        placeholder="password"
        required
        ref={confirmPass}
      />
      <br />
      <small style={{ color: "red", display: "block" }} ref={error}></small>
      <button className={classes.submit_btn} type="submit">
        Submit
      </button>
      <hr />
    </form>
  );
};

export default signup;
