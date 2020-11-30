import React, { useContext, useState } from "react";
import close from "../assets/close.png";
import edit from "../assets/edit.png";
import Loader from "../components/loader";
import { axiosHandler, errorHandler, getToken } from "../helper";
import { userDetailAction } from "../stateManagement/actions";
import { store } from "../stateManagement/store";
import { PROFILE_URL } from "../urls";

export const UserMain = (props) => {
  return (
    <div
      className={`flex align-center justify-between userMain ${
        props.clickable ? "clickable" : ""
      }`}
      onClick={() => props.clickable && props.onClick()}
    >
      <UserAvatar
        isV2
        name={props.name}
        profilePicture={props.profilePicture}
        caption={props.caption}
      />
      {props.count ||
        (props.count > 0 && <div className="counter">{props.count}</div>)}
    </div>
  );
};

export const UserAvatar = (props) => {
  return (
    <div className={`userAvatar ${props.isV2 ? "version2" : ""}`}>
      <div
        className="imageCon"
        style={{
          backgroundImage: `url("${props.profilePicture}")`,
        }}
      />
      <div className="contents">
        <div className="name">{props.name}</div>
        {!props.noStatus && <div className="subContent">{props.caption}</div>}
      </div>
    </div>
  );
};

export const ChatBubble = (props) => {
  return (
    <div className={`chatbubbleCon ${props.bubbleType}`}>
      <div className="chatbubble">
        <p>{props.message}</p>
        <div className="time">{props.time}</div>
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

  const { dispatch } = useContext(store);

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
      dispatch({ type: userDetailAction, payload: profile.data });
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
