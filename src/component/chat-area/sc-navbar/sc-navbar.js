import React, { useEffect, useState } from "react";
import classes from "./sc-navbar.css";
import video from "../../assets/images/video.png";
import { useParams } from "react-router-dom";
import avatar from "../../assets/images/avatar.png";

const navbar = () => {
  const params = useParams();
  const [image, setImage] = useState(avatar);

  useEffect(() => {
    fetch(
      `https://full-stack-chat-app-121.herokuapp.com/friend-profile-picture/${params.user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(
            sessionStorage.getItem("token")
          )}`,
        },
      }
    )
      .then((response) => {
        response.json().then((data) => {
          setImage(
            `https://full-stack-chat-app-121.herokuapp.com/image/${data.filename.profile_picture}`
          );
          console.log(data);
        });
      })
      .catch((e) => {
        alert(e.message);
      });
  }, [params]);

  return (
    <div className={classes.navbar}>
      <div
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
        className={classes.navbar_item}
      >
        <img className={classes.friend_image} src={image} alt=""></img>
        <a className={classes.navbar_link}>{params.user}</a>
      </div>
      <div className={classes.navbar_item}>
        <img className={classes.video_call} src={video} alt=""></img>
      </div>
    </div>
  );
};

export default navbar;
