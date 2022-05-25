import React, { useState, useEffect } from "react";
import classes from "./navbar.css";
import avatar from "../assets/images/avatar.png";
import hamburger from "../assets/images/hamburger.jpg";
import Dropdown from "../UI/dropdown/dropdown";

const Navbar = (props) => {
  const [userBtn, setUserBtn] = useState(false);
  const [image, setImage] = useState(avatar);

  useEffect(() => {
    const userdata = sessionStorage.getItem("userdata");
    if (userdata === undefined) {
      return;
    }
    console.log(userdata);
    const data = JSON.parse(userdata);
    if (
      data !== undefined &&
      data !== null &&
      data.image !== null &&
      data.image !== ""
    ) {
      setImage(data.image);
      return;
    }

    if (
      data !== undefined &&
      data != null &&
      data.profile_picture !== null &&
      data.profile_picture !== ""
    ) {
      setImage(
        `https://full-stack-chat-app-121.herokuapp.com/image/${data.profile_picture}`
      );
      return;
    }

    setImage(avatar);
  }, []);

  const dropdownHandler = () => {
    userBtn ? setUserBtn(false) : setUserBtn(true);
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.navbar_item}>
        <button
          onClick={props.sidebarHandler}
          className={classes.hamburger_btn}
        >
          <img src={hamburger} alt=""></img>
        </button>
        <a className={classes.navbar_link}>Application</a>
      </div>
      <div className={classes.navbar_item}>
        {userBtn ? (
          <Dropdown clickHandler={dropdownHandler} userdata={props.userdata} />
        ) : null}
        <img
          onClick={dropdownHandler}
          className={classes.user_btn}
          src={image}
          alt="Profile pic"
        ></img>
      </div>
    </div>
  );
};

export default Navbar;
