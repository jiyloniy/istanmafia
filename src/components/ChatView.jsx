import React, { useState, useEffect, useRef } from 'react';
import './ChatView.css';
import { FiPaperclip, FiMoreVertical, FiSearch } from 'react-icons/fi';
import { IoSend } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

const ChatView = ({ chat, onBack }) => {
  const [messages, setMessages] = useState(chat.messages || []);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to bottom on initial load and when messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Update messages when the chat prop changes
    setMessages(chat.messages || []);
  }, [chat]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'me',
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents adding a new line
      handleSend();
    }
  };

  return (
    <div className="chat-view">
      <div className="chat-header">
        <button onClick={onBack} className="back-button-chat">
          <FaArrowLeft />
        </button>
        <img src={chat.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.name)}&background=random`} alt={chat.name} className="avatar" />
        <div className="chat-info">
          <div className="chat-name">{chat.name}</div>
          <div className="chat-status">online</div>
        </div>
        <div className="header-icons">
          <button><FiSearch /></button>
          <button><FiMoreVertical /></button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message-wrapper ${message.sender}`}>
            <div className="message-bubble">
              <div className="message-text">{message.text}</div>
              <div className="message-time">{message.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <button className="icon-button">
          <FiPaperclip />
        </button>
        <input
          type="text"
          placeholder="Message"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend} className="send-button">
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default ChatView;
