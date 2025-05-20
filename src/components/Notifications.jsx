import React from 'react';
import profile1 from '../assets/davrontur.png';
import profile2 from '../assets/eshonqulov.png';
import profile3 from '../assets/uic.png';
import profile4 from '../assets/nasriddinov.png';
import profile5 from '../assets/it.png';
import profile6 from '../assets/cong.png';
import profile7 from '../assets/in.png';
import './notifications.css';

const Notifications = ({ onClose }) => {
  const notifications = [
    {
      section: "Asosiy",
      items: [
        {
          avatar: profile1,
          title: "Shaxsiy rivojlanish klubi",
          subtitle: "Jonli efir boshlandi",
          time: "now",
          liveTag: true,
          action: "O'tish",
          isLive: true
        },
        {
          avatar: profile2,
          title: "Yukalish sari klubi",
          subtitle: "Yangi xabar jo'natdi",
          time: "1h",
          action: "O'tish"
        }
      ]
    },
    {
      section: "Bugun",
      items: [
        {
          avatar: profile3,
          title: "Sizga mos ish topildi!",
          subtitle: "ulzgroup",
          time: "2h",
          action: "O'tish",
          hasVerified: true
        },
        {
          avatar: profile4,
          title: "Doniyor Nasriddinov",
          subtitle: "Sizni kuzatmoqda",
          time: "1h",
          action: "Ko'rish",
          hasVerified: true
        },
        {
          avatar: profile5,
          title: "IT Park",
          subtitle: "Sizni kuzatmoqda",
          time: "1h",
          action: "Ko'rish",
          hasVerified: true
        }
      ]
    },
    {
      section: "Status o'zgarishi",
      items: [
        {
          avatar: profile6,
          title: "Bek dan Xoqon ga",
          subtitle: "Status o'zgarishi",
          time: "1h",
          action: "Ko'rish",
          hasBlueCircle: true
        }
      ]
    },
    {
      section: "Kecha",
      items: [
        {
          avatar: profile7,
          title: "Profilga kirish aniqlandi",
          subtitle: "Location: Uzbekistan, Namangan city",
          time: "24h",
          action: "O'tish"
        },
        {
          avatar: profile4,
          title: "Doniyor Nasriddinov",
          subtitle: "Sizni kuzatmoqda",
          time: "25h",
          action: "Ko'rish",
          hasVerified: true
        }
      ]
    }
  ];

  return (
    <div className="notifications-container">
      {/* Header */}
      <div className="notifications-header">
        <button onClick={onClose} className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="header-title">Bildirishnomalar</h1>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {notifications.map((section, sectionIndex) => (
          <div key={sectionIndex} className="notification-section">
            <h2 className="section-title">{section.section}</h2>
            <div className="section-items">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="notification-item">
                  <div className="notification-content">
                    <div className="avatar-container" >
                      <img src={item.avatar} alt={item.title} className="avatar-image" style={{ width: '60px', height: '60px' }} />
                    </div>
                    <div className="notification-details">
                      <div className="notification-title-row">
                        <span className="notification-title">{item.title}</span>
                        {item.hasVerified && (
                          <svg className="verified-icon" viewBox="0 0 24 24" fill="#1e88e5">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        )}
                        {item.hasBlueCircle && (
                          <div className="blue-circle">B</div>
                        )}
                      </div>
                      <div className="notification-subtitle-row">
                        <span className="notification-subtitle">{item.subtitle}</span>
                        {item.liveTag && (
                          <span style={{ 
                            backgroundColor: '#FF0000', 
                            color: 'white', 
                            padding: '1px 4px', 
                            borderRadius: '3px', 
                            fontSize: '10px', 
                            fontWeight: 'bold',
                            marginLeft: '5px'
                          }}>LIVE</span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: '#65676b', marginTop: '2px' }}>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                  <button className={`action-button2   ${item.action === "Ko'rish" ? 'action-view2' : 'action-go2'}`}>
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Notifications;