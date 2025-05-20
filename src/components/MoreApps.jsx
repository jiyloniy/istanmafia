import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './moreApps.css';

// Import icons for bottom navigation
import home from '../assets/home.png';
import search from '../assets/search.png';
import addContent from '../assets/add-content.png';
import email from '../assets/email.png';
import apps from '../assets/apps.png';

// Import app icons
import brainIcon from '../assets/image 16.png';
import groupIcon from '../assets/image 17.png';
import ideaIcon from '../assets/image 18 (4).png';
import myTaxiIcon from '../assets/image 19.png';
import tezkorIcon from '../assets/image (7).png';
import miriIcon from '../assets/image 21.png';
import govService1 from '../assets/image 22.png';
import govService2 from '../assets/image 23.png';
import govService3 from '../assets/unnamed 19.png';

const MoreApps = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('apps');

  // App categories with their respective apps
  const appCategories = [
    {
      title: "Bizning ilovalar",
      verified: true,
      apps: [
        {
          id: 1,
          name: "Yaqin.AI: Eng yaqin suniy intelekt",
          icon: brainIcon,
          rating: null
        },
        {
          id: 2,
          name: "Yonimda: Oilam mening yonimda",
          icon: groupIcon,
          rating: null
        },
        {
          id: 3,
          name: "Testlab: Bilimingizni testlab oling",
          icon: ideaIcon,
          rating: null
        }
      ]
    },
    {
      title: "Tavsiya etiladi",
      verified: false,
      apps: [
        {
          id: 4,
          name: "MyTaxi: Tezkor taxi xizmati",
          icon: myTaxiIcon,
          rating: 4.1
        },
        {
          id: 5,
          name: "Uzum tezkor",
          icon: tezkorIcon,
          rating: 4.1
        },
        {
          id: 6,
          name: "Miri: Ayollar uchun maxsus ilova",
          icon: miriIcon,
          rating: 5.0
        }
      ]
    },
    {
      title: "Davlat dasturlari",
      verified: false,
      apps: [
        {
          id: 7,
          name: "E-hukumat",
          icon: govService1,
          rating: null
        },
        {
          id: 8,
          name: "Soliq Uz",
          icon: govService2,
          rating: null
        },
        {
          id: 9,
          name: "Hemis Studenlar",
          icon: govService3,
          rating: null
        }
      ]
    }
  ];

  return (
    <div className="more-apps-container">
      {/* Header */}
      <header className="more-apps-header">
        <div className="search-bar-wrapper">
          <button className="menu-button">
            <span className="menu-icon">≡</span>
          </button>
          <span className="search-bar-text">Dasturlar qidirish</span>
          <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        
        {/* Category tabs */}
        <div className="category-tabs">
          <button className="category-tab active">Asosiy</button>
          <button className="category-tab">Ta'lim</button>
          <button className="category-tab">O'yin</button>
          <button className="category-tab">Xizmatlar</button>
        </div>
      </header>

      {/* Main content */}
      <main className="more-apps-content">
        {appCategories.map((category, index) => (
          <div key={index} className="app-category">
            <div className="category-header">
              <h2>{category.title} {category.verified && <span className="verified-badge">✓</span>}</h2>
            </div>
            <div className="app-grid">
              {category.apps.map(app => (
                <div key={app.id} className="app-item">
                  <div className="app-icon">
                    <img src={app.icon} alt={app.name} onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/80';
                    }} />
                  </div>
                  <div className="app-details">
                    <h3 className="app-name">{app.name}</h3>
                    <div className="app-rating">
                      {app.rating ? `${app.rating} ★` : '5.2 ★'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

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
              <img src={home} alt="Home" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'search' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('search');
                navigate('/search');
              }}
            >
              <img src={search} alt="Search" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'addContent' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('addContent');
                navigate('/createPost');
              }}
            >
              <img src={addContent} alt="Add Content" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'email' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('email');
                navigate('/email');
              }}
            >
              <img src={email} alt="Email" className="tab-icon" />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'apps' ? 'active-tab' : ''}`} 
              onClick={() => setActiveTab('apps')}
            >
              <img src={apps} alt="Apps" className="tab-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreApps;
