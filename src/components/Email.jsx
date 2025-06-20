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
      sender: 'Otabek Arabboyev',
      subject: 'Haftalik hisobot',
      preview: 'Salom, shu hafta uchun hisobotni yuborishingizni so\'rayman...',
      time: 'Bugun, 14:30',
      isStarred: true,
      avatar: profile1
    },
    {
      sender: 'Istan',
      subject: 'Yangi xabar!',
      preview: 'Sizga Abduqodir oshnadan yangi xabar keldi.',
      time: '11:27',
      isStarred: false,
      avatar: profile2
    },
    {
      sender: 'Google',
      subject: 'Xavfsizlik ogohlantirishi',
      preview: 'Sizning hisobingizga yangi qurilmadan kirildi.',
      time: 'Kecha',
      isStarred: true,
      avatar: 'G',
      isInitial: true
    },
    {
      sender: 'Asaxiy Books',
      subject: 'Yangi kitoblar chegirmada!',
      preview: 'Sevimli kitoblaringizni 50% gacha chegirma bilan xarid qiling.',
      time: '2-iyun',
      isStarred: false,
      avatar: 'A',
      isInitial: true
    },
    {
      sender: 'Malika Azizova',
      subject: 'Uchrashuv haqida',
      preview: 'Ertangi uchrashuvimiz soat 10:00da bo\'ladi, unutmasangiz...',
      time: '1-iyun',
      isStarred: true,
      avatar: profile4
    },
    {
      sender: 'Uztelecom',
      subject: 'Hisobingizni to\'ldiring',
      preview: 'Hurmatli abonent, internet uchun to\'lovni amalga oshiring.',
      time: '31-may',
      isStarred: false,
      avatar: 'U',
      isInitial: true
    },
    {
      sender: 'HR Departamenti',
      subject: 'Muhim: Yangi ish tartibi',
      preview: 'Ertadan boshlab yangi ish tartibi kuchga kiradi. Faylni ko\'rib chiqing.',
      time: '30-may',
      isStarred: true,
      avatar: profile3,
      attachments: [
        { type: 'Ish_tartibi.pdf' },
        { type: 'Rasm' }
      ]
    },
    {
      sender: 'LinkedIn',
      subject: 'Sizda 5 ta yangi taklif bor',
      preview: 'Sizning profilingizni ko\'rgan kompaniyalardan yangi takliflar...',
      time: '29-may',
      isStarred: false,
      avatar: 'L',
      isInitial: true
    }
  ];

  return (
    <div className="email-page">
      <div className="email-header">
        <div className="header-wrapper">
          <div className="header-content">
            <button className="menu-btn">
              <img src={menuIcon} alt="Menyu" className="menu-icon-img" />
            </button>
            <h1>Mailda qidirish</h1>
            <img src={profile5} alt="Profil" className="profile-pic" />
          </div>
         
        </div>
      </div>

      {/* Email List */}
      <div className="email-list">
        <div className="section-title">Asosiy</div>
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
              <img src={home || "Default"} alt="Bosh sahifa" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'search' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('search');
                // Assuming there's a search page route
                navigate('/search');
              }}
            >
              <img src={search || "Default"} alt="Qidiruv" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'addContent' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('addContent');
                setShowPostCreate(true);
                navigate('/createPost');
              }}
            >
              <img src={addContent || "Default"} alt="Qo'shish" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'email' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('email');
                navigate('/email');
              }}
            >
              <img src={email || "Default"} alt="Xabarlar" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'apps' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('apps');
                navigate('/more-apps');
              }}
            >
              <img src={apps || "Default"} alt="Ilovalar" className="tab-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;