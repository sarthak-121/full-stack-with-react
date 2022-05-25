import React, { useState, useEffect } from "react";
import classes from "./App.css";
import Navbar from "./../component/navbar/navbar";
import Sidebar from "./../component/sidebar/sidebar";
import ChatArea from "../component/chat-area/chat";
import Model from "../component/UI/model/model";
import Register from "../component/signup-login-model/model";
import Requests from "../component/requests/requests";
import Settings from "../component/settings/settings";
import ForgotPassword from "../component/forgot-password/forgot-password";
import ChangePassword from "../component/change-password/change-password";
import Feeds from "../component/feeds/feeds";
import io from "socket.io-client/dist/socket.io.js";
import { useDispatch } from "react-redux";
import {
  sendedAction,
  recievedAction,
  credentialAction,
  friendAction,
} from "../store/index";
import { Route, Switch } from "react-router-dom";
import dotenv from "dotenv";

dotenv.config();
const socket = io("https://full-stack-chat-app-121.herokuapp.com/");

const app = () => {
  const dispatch = useDispatch();

  const [userdata, setUserdata] = useState({
    username: "....",
    password: "",
    email: "",
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [sidebarState, setSidebarState] = useState(false);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("userdata"));
    const token = JSON.parse(sessionStorage.getItem("token"));

    if (data) {
      authenticationHandler(data, token);
      socket.on("welcomeMessage", (msg) => {
        console.log(msg);
      });
    }
  }, []);

  const authenticationHandler = (data, token) => {
    console.log(data);
    setUserdata({
      username: data.username,
      password: data.password,
      email: data.email,
    });
    dispatch(
      credentialAction.set({
        username: data.username,
        password: data.password,
        email: data.email,
      })
    );

    dispatch(sendedAction.addArray(data.sended));
    dispatch(recievedAction.addArray(data.recieved));
    dispatch(friendAction.addArray(data.friends));
    setAuthenticated(true);

    sessionStorage.setItem("userdata", JSON.stringify(data));
    sessionStorage.setItem("token", JSON.stringify(token));
  };

  const sidebarHandler = () => {
    sidebarState ? setSidebarState(false) : setSidebarState(true);
  };

  const sendedRequestsHandler = async (people) => {
    const data = {
      sender: userdata.username,
      reciever: people,
    };

    try {
      const response = await fetch(
        "https://full-stack-chat-app-121.herokuapp.com/setRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authentication: `Bearer ${JSON.parse(
              sessionStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = JSON.parse(sessionStorage.getItem("userdata"));

        if (data) {
          data.sended.push(people);
        }

        sessionStorage.setItem("userdata", JSON.stringify(data));
        dispatch(sendedAction.add(people));
      } else {
        throw new Error("something went wrong!");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={classes.App}>
      <Switch>
        <Route path="/requests">
          {authenticated ? null : (
            <Model>
              <Register authenticate={authenticationHandler} />
            </Model>
          )}
          <Requests />
        </Route>
        <Route path="/connect/:user/:room">
          {authenticated ? null : (
            <Model>
              <Register authenticate={authenticationHandler} />
            </Model>
          )}
          <Navbar userdata={userdata} sidebarHandler={sidebarHandler} />
          <div className={classes.container}>
            <Sidebar
              username={userdata.username}
              authenticated={authenticated}
              sidebarState={sidebarState}
              sendedRequestsHandler={sendedRequestsHandler}
            />
            <ChatArea socket={socket} />
          </div>
        </Route>
        <Route path="/" exact>
          {authenticated ? null : (
            <Model>
              <Register authenticate={authenticationHandler} />
            </Model>
          )}
          <Navbar userdata={userdata} sidebarHandler={sidebarHandler} />
          <div className={classes.container}>
            <Sidebar
              username={userdata.username}
              authenticated={authenticated}
              sidebarState={sidebarState}
              sendedRequestsHandler={sendedRequestsHandler}
            />
            <Feeds />
          </div>
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/change-password">
          <ChangePassword />
        </Route>
        <Route path="*">
          <h1>Not found</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default app;
