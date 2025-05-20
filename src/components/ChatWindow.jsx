import React from 'react';
import './chatWindow.css';

const ChatWindow = ({ chat, onClose }) => {
  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <button className="back-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <div className="chat-window-profile">
          <img src={chat.image} alt={chat.name} className="chat-window-avatar" />
          <div className="chat-window-info">
            <div className="chat-window-name">{chat.name}</div>
            <div className="chat-window-status">online</div>
          </div>
        </div>
        <div className="chat-window-actions">
          <button className="action-button">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>
            </svg>
          </button>
          <button className="action-button">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/>
            </svg>
          </button>
          <button className="action-button">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="chat-window-messages">
        <div className="message received">
          <div className="message-content">
            Lorem ipsum dolor sit amet, consectetur...
          </div>
          <div className="message-time">3:29 PM</div>
        </div>
        <div className="message sent">
          <div className="message-content">
            Sed do eiusmod tempor incididunt ut labore
          </div>
          <div className="message-time">3:30 PM</div>
        </div>
        <div className="message received">
          <div className="message-content">
            Ut enim ad minim veniam
          </div>
          <div className="message-time">3:30 PM</div>
        </div>
      </div>
      <div className="chat-window-input">
        <button className="attachment-button">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
          </svg>
        </button>
        <input type="text" placeholder="Xabar yozing..." className="message-input" />
        <button className="send-button">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
