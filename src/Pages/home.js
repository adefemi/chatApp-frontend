import React, { useState, useContext, useEffect } from "react";

import settings from "../assets/settings.png";

import logoutPng from "../assets/logout.png";
import { UserAvatar, ProfileModal } from "./homeComponents";
import { store } from "../stateManagement/store";
import Loader from "../components/loader";
import { logout } from "./authController";
import UsersList from "./usersList";
import ChatInterface from "./chatInterface";

const Home = (props) => {
  const [showProfile, setShowProfile] = useState(false);
  const [profileClosable, setProfileClosable] = useState(true);
  const [userdetail, setUserDetail] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  const {
    state: { userDetail, activeChatUser },
  } = useContext(store);

  useEffect(() => {
    if (userDetail !== userdetail) {
      setUserDetail(userDetail);
      if (!userDetail.first_name) {
        setShowProfile(true);
        setProfileClosable(false);
      }
    }

    if (activeUser !== activeChatUser) {
      setActiveUser(activeChatUser);
    }
  }, [userDetail, activeChatUser]);

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
          {activeUser ? (
            <ChatInterface activeUser={activeUser} loggedUser={userdetail} />
          ) : (
            <div className="noUser">Click on a user to start chatting</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
