import React, { useCallback, useEffect, useState } from "react";
import classes from "./requests.css";
import { useSelector } from "react-redux";
import { Route, Switch, NavLink, useHistory } from "react-router-dom";
import { sendedAction, recievedAction } from "../../store/index";
import { useDispatch } from "react-redux";
import reload from "../assets/images/reload.png";
import useMakeReqList from "../../hooks/use-makeReqList";

const requests = () => {
  let sendedList = useSelector((state) => state.sended);
  let recievedList = useSelector((state) => state.recieved);
  const history = useHistory();
  const dispatch = useDispatch();
  const [recList, setRecList] = useState(<h6>No requests yet!</h6>);
  const [senList, setSenList] = useState(<h6>No requests yet!</h6>);

  const init = useCallback(() => {
    if (sendedList !== undefined && sendedList.length !== 0) {
      setSenList(useMakeReqList(sendedList, true));
    }
    if (recievedList !== undefined && recievedList.length !== 0) {
      setRecList(useMakeReqList(recievedList, false));
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  const backButtonHandler = () => {
    history.push("/");
  };

  const getRequests = async () => {
    try {
      const response = await fetch(
        `https://full-stack-chat-app-121.herokuapp.com/requests`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("token")
            )}`,
          },
        }
      );

      const data = await response.json();

      if (data.error === true) {
        throw new Error(data.message);
      }
      const sended = [...new Set(data.data.sended, sendedList)];
      const recieved = [...new Set(data.data.recieved, recievedList)];

      dispatch(sendedAction.assignArray(sended));
      dispatch(recievedAction.assignArray(recieved));
      setRecList(useMakeReqList(recieved, false));
      setSenList(useMakeReqList(sended, true));
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className={classes.requests}>
      <div className={classes.head}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div onClick={backButtonHandler}>
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </div>
          <h4>Requests</h4>
        </div>
        <ul>
          <NavLink
            activeClassName={classes.active}
            className={classes.toggel_btn}
            to="/requests/sended"
          >
            Sended
          </NavLink>
          <NavLink
            activeClassName={classes.active}
            className={classes.toggel_btn}
            to="/requests/recieved"
          >
            Recieved
          </NavLink>
          <img
            onClick={getRequests}
            className={classes.reload_btn}
            src={reload}
            alt="reload icon"
          />
        </ul>
      </div>
      <Switch>
        <Route path="/requests/sended">{senList}</Route>
        <Route path="/requests/recieved">{recList}</Route>
        <Route path="*">Not found</Route>
      </Switch>
    </div>
  );
};

export default requests;
