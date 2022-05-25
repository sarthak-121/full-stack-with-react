import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./change-password.css";

const change_password = () => {
  const pass = useRef();
  const confirmPass = useRef();
  const error = useRef();
  const params = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (pass.current.value !== confirmPass.current.value) {
      error.current.style.display = "flex";
      error.current.innerHTML = "Password did not match";
      error.current.style.color = "red";
    }

    const body = {
      password: pass.current.value,
      token: params.token,
    };
    try {
      const response = await fetch(
        "https://full-stack-chat-app-121.herokuapp.com/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.error === true) {
        error.current.style.display = "flex";
        error.current.innerHTML = data.message;
        error.current.style.color = "green";
        return;
      }
      if (data.success === true) {
        error.current.style.display = "flex";
        error.current.innerHTML = data.message;
        error.current.style.color = "green";
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.forgot_password}>
      <h2>Change Password</h2>
      <div>
        <small>
          Dont wory, happens to the best of us :( Enter you email and we will
          send you a reset password url on your mail
        </small>
      </div>
      <form className={classes.email_input}>
        <small>Enter a new password</small>
        <input type="password" placeholder="Passwrod" ref={pass} />
        <input
          type="password"
          placeholder="Confirm Passwrod"
          ref={confirmPass}
        />
        <button
          className={classes.button_submit}
          type="submit"
          onClick={submitHandler}
        >
          Change
        </button>
      </form>
      <div className={classes.error_box} ref={error}>
        Mail Sent
      </div>
    </div>
  );
};

export default change_password;
