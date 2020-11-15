import React, { useState, useContext, useEffect } from "react";
import favorite from "../assets/star.png";
import smiley from "../assets/smiley.png";
import send from "../assets/send.png";
import settings from "../assets/settings.png";
import search from "../assets/search.png";
import logout from "../assets/logout.png";
import {
  ChatBubble,
  UserAvatar,
  UserMain,
  ProfileModal,
} from "./homeComponents";
import { store } from "../stateManagement/store";
import Loader from "../components/loader";

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
            <UserAvatar noStatus isV2 />
            <img src={settings} onClick={() => setShowProfile(true)} />
          </div>

          <div className="searchCon">
            <img src={search} />
            <input placeholder="Search users" />
          </div>

          <div className="userList">
            <UserMain />
            <UserMain />
            <UserMain />
            <UserMain />
            <UserMain />
            <UserMain />
            <UserMain />
            <UserMain />
            <UserMain />
            <UserMain />
            <UserMain />
            <UserMain />
            <UserMain />
            <UserMain />
          </div>
          <div className="logout">
            <img src={logout} />
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
