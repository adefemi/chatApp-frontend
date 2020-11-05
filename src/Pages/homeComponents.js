import React from "react";

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
