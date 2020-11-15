import React, { useState } from "react";
import close from "../assets/close.png";
import edit from "../assets/edit.png";
import Loader from "../components/loader";
import { axiosHandler, errorHandler, getToken } from "../helper";
import { PROFILE_URL } from "../urls";

export const UserMain = (props) => {
  return (
    <div className="flex align-center justify-between userMain">
      <UserAvatar isV2 />
      <div className="counter">2</div>
    </div>
  );
};

export const UserAvatar = (props) => {
  return (
    <div className={`userAvatar ${props.isV2 ? "version2" : ""}`}>
      <div
        className="imageCon"
        style={{
          backgroundImage: `url("https://cdn.pixabay.com/photo/2017/05/25/21/26/bird-feeder-2344414__340.jpg")`,
        }}
      />
      <div className="contents">
        <div className="name">Andy Hui</div>
        {!props.noStatus && (
          <div className="subContent">Random status message</div>
        )}
      </div>
    </div>
  );
};

export const ChatBubble = (props) => {
  return (
    <div className={`chatbubbleCon ${props.bubbleType}`}>
      <div className="chatbubble">
        <p>
          This is just a random message content to test message fluidity and
          access how content would be shown
        </p>
        <div className="time">08:22</div>
      </div>
    </div>
  );
};

export const ProfileModal = (props) => {
  const [profileData, setProfileData] = useState({
    ...props.userDetail,
    user_id: props.userDetail.user.id,
  });
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const token = await getToken(props);
    const url =
      PROFILE_URL +
      `${props.userDetail.first_name ? `/${profileData.user_id}` : ""}`;
    const method = props.userDetail.first_name ? "patch" : "post";
    const profile = await axiosHandler({
      method,
      url,
      data: profileData,
      token,
    }).catch((e) => alert(errorHandler(e)));
    setSubmitted(false);
    if (profile) {
      props.setClosable();
      console.log(profile.data);
    }
  };

  const onChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`modalContain ${props.visible ? "open" : ""}`}>
      <div className="content-inner">
        <div className="header">
          <div className="title">Update Profile</div>
          {props.closable && <img src={close} onClick={props.close} />}
        </div>
        <form className="content" onSubmit={submit}>
          <div className="inner">
            <div className="leftHook">
              <div
                className="imageCon"
                style={{
                  backgroundImage: `url("")`,
                }}
              />
              <div className="point">
                Change Picture
                <img src={edit} />
              </div>
            </div>
            <div className="dataInput">
              <label>
                <span>First name</span>
                <input
                  name="first_name"
                  value={profileData.first_name}
                  onChange={onChange}
                  required
                />
              </label>
              <label>
                <span>Last name</span>
                <input
                  name="last_name"
                  value={profileData.last_name}
                  onChange={onChange}
                  required
                />
              </label>
              <label>
                <span>Caption</span>
                <input
                  name="caption"
                  value={profileData.caption}
                  onChange={onChange}
                  required
                />
              </label>
              <label>
                <span>About</span>
                <textarea
                  name="about"
                  value={profileData.about}
                  onChange={onChange}
                  required
                />
              </label>
            </div>
          </div>
          <button type="submit" disabled={submitted}>
            {submitted ? (
              <center>
                <Loader />
              </center>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
