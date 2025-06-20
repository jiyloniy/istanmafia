import React from "react";
import "./ChatView.css";

const GroupChatView = ({ group }) => {
  if (!group) return null;
  return (
    <div className="chat-view">
      <div className="chat-header group-header">
        <img className="avatar" src={group.image} alt={group.name} />
        <div className="group-info">
          <div className="group-name">{group.name}</div>
          <div className="group-members">{group.members} a'zo</div>
          <div className="group-topic">{group.topic}</div>
        </div>
      </div>
      <div className="chat-messages">
        {/* Mock messages for now */}
        <div className="message-wrapper them">
          <div className="message-bubble">Assalomu alaykum, guruhga xush kelibsiz!</div>
        </div>
        <div className="message-wrapper me">
          <div className="message-bubble">Salom! Yangi loyihalar haqida gaplashamizmi?</div>
        </div>
      </div>
      <div className="chat-input-area">
        <input className="chat-input" type="text" placeholder="Xabar yozing..." disabled />
        <button className="send-btn" disabled>
          <svg height="24" width="24" viewBox="0 0 24 24" fill="#008c8c"><path d="M2 21l21-9-21-9v7l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  );
};

export default GroupChatView;
