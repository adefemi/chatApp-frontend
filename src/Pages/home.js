import React, { useState, useContext, useEffect } from "react";
import favorite from "../assets/star.png";
import smiley from "../assets/smiley.png";
import send from "../assets/send.png";
import settings from "../assets/settings.png";

import logoutPng from "../assets/logout.png";
import { ChatBubble, UserAvatar, ProfileModal } from "./homeComponents";
import { store } from "../stateManagement/store";
import Loader from "../components/loader";
import { logout } from "./authController";
import UsersList from "./usersList";

const Home = (props) => {
  const [showProfile, setShowProfile] = useState(false);
  const [profileClosable, setProfileClosable] = useState(true);
  const [userdetail, setUserDetail] = useState(null);

  const {
    state: { userDetail },
  } = useContext(store);

  useEffect(() => {
    if (userDetail !== userdetail) {
      setUserDetail(userDetail);
      if (!userDetail.first_name) {
        setShowProfile(true);
        setProfileClosable(false);
      }
    }
  }, [userDetail]);

  if (!userdetail) {
    return (
      <div className="centerAll">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <ProfileModal
        {...props}
        close={() => setShowProfile(false)}
        userDetail={userdetail}
        visible={showProfile}
        closable={profileClosable}
        setClosable={() => setProfileClosable(true)}
      />
      <div className="home-container">
        <div className="side">
          <div className="flex align-center justify-between top">
            <UserAvatar
              noStatus
              isV2
              name={`${userdetail.first_name || ""} ${
                userdetail.last_name || ""
              }`}
              profilePicture={userdetail.profile_picture}
            />
            <img src={settings} onClick={() => setShowProfile(true)} />
          </div>

          <UsersList />
          <div className="logout" onClick={() => logout(props)}>
            <img src={logoutPng} />
            <div>logout</div>
          </div>
        </div>
        <div className="main">
          <div className="flex align-center justify-between heading">
            <UserAvatar />
            <div className="flex align-center rightItems">
              <img src={favorite} />
              <img src={userDetail} />
            </div>
          </div>
          <div className="chatArea">
            <ChatBubble bubbleType="" />
            <ChatBubble bubbleType="sender" />
            <ChatBubble bubbleType="sender" />
            <ChatBubble bubbleType="" />
            <ChatBubble bubbleType="" />
            <ChatBubble bubbleType="sender" />
            <ChatBubble bubbleType="sender" />
            <ChatBubble bubbleType="" />
            <ChatBubble bubbleType="" />
            <ChatBubble bubbleType="sender" />
            <ChatBubble bubbleType="sender" />
            <ChatBubble bubbleType="" />
          </div>
          <div className="messageZone">
            <div className="flex align-center justify-between topPart">
              <img src={smiley} />
              <img src={send} />
            </div>
            <textarea placeholder="Type your message here..." />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
