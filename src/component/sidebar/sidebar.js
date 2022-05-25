import React, { useState, useEffect, useCallback } from "react";

import classes from "./sidebar.css";
import useMakePropleList from "../../hooks/use-makePeopleList";
import List from "./list/list";
import { useSelector } from "react-redux";

const sidebar = (props) => {
  const [peopleList, setPeopleList] = useState([]);
  const [styles, setStyles] = useState(classes.sidebar);
  const friends = useSelector((state) => state.friends);

  const getPeopleList = useCallback(async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log(token);
    try {
      const response = await fetch("http://localhost:8001/people", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setPeopleList(data);
    } catch (e) {
      alert(e);
    }
  }, []);

  useEffect(() => {
    if (props.authenticated) {
      getPeopleList();
    }
  }, [props.authenticated, getPeopleList]);

  useEffect(() => {
    if (props.sidebarState) {
      setStyles(classes.sidebar);
    } else {
      setStyles(classes.sidebar_show);
    }
  }, [props.sidebarState]);

  const sendRequest = async (index) => {
    props.sendedRequestsHandler(peopleList[index]);
  };

  const renderedPeopleList = useMakePropleList(peopleList, sendRequest);

  let counter = 0;
  let renderedFriendList = (
    <div>
      {friends.map((friend) => {
        counter += 1;
        return (
          <List
            name={friend.name}
            bin={false}
            // click={}
            key={counter}
          />
        );
      })}
    </div>
  );

  if (renderedFriendList.props.children.length === 0) {
    renderedFriendList = null;
  }

  return (
    <div className={styles}>
      <h2 className={classes.heading}>Hi, {props.username}</h2>
      <hr />
      <h2 className={classes.heading}>People</h2>
      {renderedPeopleList ? (
        renderedPeopleList
      ) : (
        <p className={classes.msg}>No people Yet!</p>
      )}
      <hr />
      <h2 className={classes.heading}>Friends</h2>
      {renderedFriendList ? (
        renderedFriendList
      ) : (
        <p className={classes.msg}>No friends Yet!</p>
      )}
      <hr />
      <h2 className={classes.heading}>About</h2>
      {/* <p className={classes.msg}>Sarthak Kavidayal</p> */}
      <p className={classes.msg}>&#169; 2022</p>
    </div>
  );
};

export default sidebar;
