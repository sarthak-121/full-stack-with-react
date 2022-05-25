import React, { useRef } from "react";
import classes from "./forgot-password.css";

const forgot_password = () => {
  const email = useRef();
  const error = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    error.current.innerHTML = "An error occured, try again";
    error.current.style.color = "red";

    try {
      const response = await fetch(
        `https://full-stack-chat-app-121.herokuapp.com/forgot-password/${email.current.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.success === true) {
        error.current.style.display = "flex";
      }
      if (data.error === true) {
        error.current.style.display = "flex";
        error.current.innerHTML = data.message;
        error.current.style.color = "red";
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className={classes.forgot_password}>
      <h2>Forgot Password</h2>
      <div>
        <small>
          Dont wory, happens to the best of us :( Enter you email and we will
          send you a reset password url on your mail
        </small>
      </div>
      <form className={classes.email_input}>
        <small>Enter your registered email</small>
        <input type="text" placeholder="Email" ref={email} required />
        <button
          className={classes.button_submit}
          type="submit"
          onClick={submitHandler}
        >
          Send
        </button>
      </form>
      <div className={classes.error_box} ref={error}>
        Mail Sent
      </div>
    </div>
  );
};

export default forgot_password;
