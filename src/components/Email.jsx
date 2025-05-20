import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile1 from '../assets/Ellipse 4.png';
import profile2 from '../assets/Ellipse 3.png';
import profile3 from '../assets/Avatar (1).png';
import profile4 from '../assets/Ellipse 5.png';
import profile5 from '../assets/Avatar.png';
import home from '../assets/home.png';
import search from '../assets/search.png';
import addContent from '../assets/add-content.png';
import email from '../assets/email.png';
import apps from '../assets/apps.png';
import menuIcon from '../assets/Menu (2).png'; // Assuming menuIcon.png exists in assets
import './email.css';

const Email = ({ onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('email');
  const [showPostCreate, setShowPostCreate] = useState(false);

  const emails = [
    {
      sender: 'Taylor Grey',
      subject: 'Timesheet nextweek?',
      preview: 'Hey what was our timesheet that was for...',
      time: 'May 6',
      isStarred: true,
      avatar: profile1
    },
    {
      sender: 'Stephanie Everhill',
      subject: 'When do we meet again?',
      preview: 'I would meet at the Western Mall if you...',
      time: '11:27 pm',
      isStarred: false,
      avatar: profile2
    },
    {
      sender: 'Fortune Company co.',
      subject: 'Important Files!',
      preview: 'Make sure you receive these.',
      time: '11:27 pm',
      isStarred: true,
      avatar: profile3,
      attachments: [
        { type: 'Pre-Order...', count: 3 },
        { type: 'Image' } 
      ]
    },
    {
      sender: 'Stephanie Everhill',
      subject: 'When do we meet again?',
      preview: 'I would meet at the Western Mall if you...',
      time: '11:27 pm',
      isStarred: false,
      avatar: profile2
    },
    {
      sender: 'Random Bank Online',
      subject: 'Random Bank Account Balance Update',
      preview: 'Time to check your bank information an...',
      time: 'June 19',
      isStarred: false,
      avatar: 'R',
      isInitial: true
    },
    {
      sender: 'Taylor Grey',
      subject: 'Timesheet nextweek?',
      preview: 'Hey what was our timesheet that was for...',
      time: 'May 6',
      isStarred: true,
      avatar: profile1
    },
    {
      sender: 'UniqueYou by SecretKissShop',
      subject: 'Learn new Tricks',
      preview: 'Now is great time to shop great new fash...',
      time: 'May 6',
      isStarred: false,
      avatar: profile4
    },
    {
      sender: 'Stephanie Everhill',
      subject: 'When do we meet again?',
      preview: 'When do we meet again?',
      time: '11:27 pm',
      isStarred: false,
      avatar: profile2
    }
  ];

  return (
    <div className="email-page">
      <div className="email-header">
        <div className="header-wrapper">
          <div className="header-content">
            <button className="menu-btn">
              <img src={menuIcon} alt="Menu" className="menu-icon-img" />
            </button>
            <h1>Mailda qidirish</h1>
            <img src={profile5} alt="Profile" className="profile-pic" />
          </div>
         
        </div>
      </div>

      {/* Email List */}
      <div className="email-list">
        <div className="section-title">Primary</div>
        {emails.map((email, index) => (
          <div key={index} className="email-item">
            <div className="email-left">
              {email.isInitial ? (
                <div className="avatar-initial">{email.avatar}</div>
              ) : (
                <img src={email.avatar} alt="" className="avatar" />
              )}
              <div className="email-content">
                <div className="email-top">
                  <span className="sender">{email.sender}</span>
                  <span className="time">{email.time}</span>
                </div>
                <div className="subject">{email.subject}</div>
                <div className="preview">{email.preview}</div>
                {email.attachments && (
                  <div className="attachments">
                    {email.attachments.map((attachment, idx) => (
                      <span key={idx} className="attachment">
                        {attachment.count ? `${attachment.type} +${attachment.count}` : attachment.type}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button className={`star-button ${email.isStarred ? 'starred' : ''}`}>
              <svg viewBox="0 0 24 24" fill={email.isStarred ? 'currentColor' : 'none'} stroke="currentColor">
                <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="bottom-nav-container">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'home' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('home');
                navigate('/home');
              }}
            >
              <img src={home || "Default"} alt="Home" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'search' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('search');
                // Assuming there's a search page route
                navigate('/search');
              }}
            >
              <img src={search || "Default"} alt="Search" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'addContent' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('addContent');
                setShowPostCreate(true);
                navigate('/createPost');
              }}
            >
              <img src={addContent || "Default"} alt="Add Content" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'email' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('email');
                navigate('/email');
              }}
            >
              <img src={email || "Default"} alt="Email" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'apps' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('apps');
                navigate('/more-apps');
              }}
            >
              <img src={apps || "Default"} alt="Apps" className="tab-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;