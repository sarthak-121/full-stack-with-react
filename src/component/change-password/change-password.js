import React, { useRef } from "react";
import classes from "./change-password.css";

const change_password = () => {
  const pass = useRef();
  const confirmPass = useRef();
  const error = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    error.current.innerHTML = "An error occured, try again";
    error.current.style.color = "red";
    error.current.style.display = "flex";
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
