import React from "react";

import classes from "./dropdown.css";
import Aux from "../../../hoc/Auxillary";
import Backdrop from "../backdrop/backdrop";
import { Link } from "react-router-dom";

const dropdown = (props) => {
  const logoutHandler = () => {
    sessionStorage.removeItem("userdata");
    window.location.reload();
  };

  return (
    <Aux>
      <Backdrop clickHandler={props.clickHandler} />
      <div className={classes.container}>
        <p className={classes.name}>{props.userdata.username}</p>
        <p className={classes.email}>{props.userdata.email}</p>
        <div>
          <hr />
        </div>
        <Link to="/requests/sended" className={classes.dropdown_items}>
          Requests
        </Link>
        <Link to="/settings" className={classes.dropdown_items}>
          Settings
        </Link>
        <Link onClick={logoutHandler} className={classes.dropdown_items}>
          Log Out
        </Link>
      </div>
    </Aux>
  );
};

export default dropdown;
