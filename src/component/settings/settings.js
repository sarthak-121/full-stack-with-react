import React, { useEffect, useRef, useState } from "react";

import classes from "./settings.css";
import { useHistory } from "react-router-dom";
import avatar from "../assets/images/avatar.png";

const settings = () => {
  const history = useHistory();
  const file = useRef();
  const [image, setImage] = useState();

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("userdata"));
    if (data.image) {
      setImage(data.image);
      return;
    }

    if (data.profile_picture) {
      setImage(
        `https://full-stack-chat-app-121.herokuapp.com/image/${data.profile_picture}`
      );
      return;
    }

    setImage(avatar);
  }, []);

  const backButtonHandler = () => {
    history.push("/");
  };

  const addImageHandler = () => {
    file.current.click();
  };

  const uploadImage = async (e) => {
    console.log("Working");
    console.log(e.target.files[0]);

    try {
      const userData = new FormData();
      userData.append("profile_pic", e.target.files[0]);
      userData.append(
        "username",
        await JSON.parse(sessionStorage.getItem("userdata")).username
      );

      const response = await fetch(
        `https://full-stack-chat-app-121.herokuapp.com/profile-picture`,
        {
          method: "POST",
          headers: {
            Authentication: `Bearer ${JSON.parse(
              sessionStorage.getItem("token")
            )}`,
          },
          body: userData,
        }
      );

      const data = await response.json();
      console.log(data);

      const imageURL = `https://full-stack-chat-app-121.herokuapp.com/image/${data.filename}`;
      setImage(imageURL);
      const localData = JSON.parse(sessionStorage.getItem("userdata"));
      localData.image = imageURL;
      sessionStorage.setItem("userdata", JSON.stringify(localData));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={classes.settings}>
      <div className={classes.head}>
        <div onClick={backButtonHandler}>
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </div>
        <h4>Settings</h4>
      </div>
      <img className={classes.photo_circle} src={image} alt="profile-pic" />
      <div className={classes.button_div}>
        <button className={classes.buttons} onClick={addImageHandler}>
          Add
        </button>
        <button className={classes.buttons}>Remove</button>
      </div>
      <input
        ref={file}
        type="file"
        style={{ display: "none" }}
        onChange={uploadImage}
      />
    </div>
  );
};

export default settings;
