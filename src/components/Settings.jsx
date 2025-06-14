import React, { useState, useEffect, useRef } from 'react';
import './settings.css';
import { useNavigate } from 'react-router-dom';
import { API_URL, API_URL2, ENDPOINTS } from '../config/api';
import profile5 from '../assets/default.png';
import BioEditModal from './BioEditModal';

const Settings = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [showBioModal, setShowBioModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${API_URL}${ENDPOINTS.PROFILE_COMPACT}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.status === 'success') {
        setUserInfo(data.data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('profile_picture', file);

    try {
      const response = await fetch(`${API_URL}${ENDPOINTS.PROFILE_UPDATE}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: formData
      });

      const result = await response.json();
      if (result.status === 'success') {
        setUserInfo(result.data);
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBioSave = async (newBio) => {
    try {
      const formData = new FormData();
      formData.append('bio', newBio);

      const response = await fetch(`${API_URL}${ENDPOINTS.PROFILE_UPDATE}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: formData
      });

      const result = await response.json();
      if (result.status === 'success') {
        setUserInfo(result.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating bio:', error);
      return false;
    }
  };

  // Back button functionality (would use navigate in a real app)
  const handleBack = () => {
    navigate(-1);
  };

  // Logout functionality (would use navigate in a real app)
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="settings-container">
      {/* Profile Section */}
      <div className="settings-header">
        <button onClick={handleBack} className="back-button2">
          <span style={{ fontSize: '24px', color: 'white' }}>‹</span>
        </button>
      </div>

      <div className="settings-profile-section">
        <div className="settings-profile-header">
        
            <img 
            src={isLoading ? profile5 : (API_URL2 + userInfo?.user?.profile_picture || profile5)} 
            alt="Profile" 
            className={`settings-profile-image ${isLoading ? 'loading' : ''}`}
            onClick={() => fileInputRef.current?.click()}
          />
          <div className="camera-button" onClick={() => fileInputRef.current?.click()}>             
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"/>
            </svg>
          </div>
          
          <div className="settings-profile-title">
            <div className="settings-profile-name-row">
              <h2 className="settings-profile-name">{userInfo?.user?.full_name || 'Bunyodbek Abduraz...'}</h2>
              <div className="settings-profile-badge">
                <span>{userInfo?.profession?.[0]?.name || 'IT'}</span>
                <span className="settings-badge-star">★</span>
                <span className="">5</span> 
                {userInfo?.is_verified && (
                  <>
                   
                    <div className="settings-profile-contact">
                      <p>{userInfo?.user?.phone || ''}</p>
                      <p>{userInfo?.user?.username || userInfo?.user?.email || ''}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="settings-contact-section">
          <div className="settings-contact-item">
            <div className="settings-phone-number">
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#008C8C" style={{ marginRight: '8px' }}>
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                {userInfo?.user?.phone || ''}
              </span>
            </div>
            <div className="settings-contact-label">Telefon raqamini o'zgartirish uchun bosing</div>
          </div>
          
          <div className="settings-contact-item">
            <div className="settings-username-row">
              <div className="settings-phone-number">
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#008C8C" style={{ marginRight: '8px' }}>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  {userInfo?.user?.username || userInfo?.user?.email || ''}
                </span>
              </div>
              <div className="settings-qr-code">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#008C8C">
                  <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 12h7v7H3v-7zm2 2v3h3v-3H5zm7-2h2v2h-2v-2zm0 4h2v3h-2v-3zm4-4h3v2h-3v-2zm0 4h3v3h-3v-3z"/>
                </svg>
              </div>
            </div>
            <div className="settings-contact-label">username</div>
          </div>
          
          <div className="settings-contact-item" onClick={() => setShowBioModal(true)}>
            <div className="settings-phone-number">
              <span style={{ display: 'flex', alignItems: 'flex-start' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#008C8C" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}>
                  <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
                </svg>
                <span style={{ wordBreak: 'break-word' }}>{userInfo?.user?.bio || 'Dasturlashni bilish - Tartiblanshi bilishdir !'}</span>
              </span>
            </div>
            <div className="settings-contact-label">Men haqimda</div>
          </div>

          {showBioModal && (
            <BioEditModal
              currentBio={userInfo?.user?.bio}
              onClose={() => setShowBioModal(false)}
              onSave={handleBioSave}
            />
          )}

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageSelect}
          />
        </div>
      </div>

      {/* Premium Menu Items */}
      <div className="settings-menu-section">
        <div className="settings-menu-item settings-premium-item" style={{
          marginTop: "20px",
          
          }}>
          <span className="settings-menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 12 7.4l3.38 4.6L17 10.83 14.92 8H20v6z"/>
            </svg>
          </span>
          <span className="settings-menu-text">Istan Premium</span>
          <span className="settings-menu-arrow">›</span>
        </div>

        <div className="settings-menu-item settings-verify-item " style={{
        marginTop: "10px",
         
        }}>
          <span className="settings-menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 12 7.4l3.38 4.6L17 10.83 14.92 8H20v6z"/>
            </svg>
          </span>
          <span className="settings-menu-text">Istan Verify</span>
          <span className="settings-menu-arrow">›</span>
        </div>

        <div className="settings-menu-item">
          <span className="settings-menu-icon">💳</span>
          <span className="settings-menu-text">Kartalar</span>
          <span className="settings-menu-arrow">›</span>
        </div>

        <div className="settings-menu-item">
          <span className="settings-menu-icon">📝</span>
          <span className="settings-menu-text">To'lov tarixi</span>
          <span className="settings-menu-arrow">›</span>
        </div>
      </div>
      
      <h3 className="settings-section-title">Sozlamalar</h3>
      <div style={{ 
        width: '100%', 
        height: '10px', 
        background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'12\' viewBox=\'0 0 20 12\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M6 12c0-6.627-5.373-12-12-12-6.627 0-12 5.373-12 12s5.373 12 12 12c6.627 0 12-5.373 12-12zm-12 10c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm-6-10c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6-6 2.686-6 6z\' fill=\'%23008c8c\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        marginBottom: '10px',
        opacity: 0.5
      }}></div>
      
      <div className="settings-menu-section">
        <div className="settings-menu-item">
          <span className="settings-menu-icon">💬</span>
          <span className="settings-menu-text">Chat sozlamalari</span>
          <span className="settings-menu-arrow">›</span>
        </div>
        
        <div className="settings-menu-item">
          <span className="settings-menu-icon">🔒</span>
          <span className="settings-menu-text">Xavfsizlik sozlamalari</span>
          <span className="settings-menu-arrow">›</span>
        </div>
        
        <div className="settings-menu-item">
          <span className="settings-menu-icon">🔔</span>
          <span className="settings-menu-text">Xabarlar va ovozlar</span>
          <span className="settings-menu-arrow">›</span>
        </div>
        
        <div className="settings-menu-item">
          <span className="settings-menu-icon">💾</span>
          <span className="settings-menu-text">Malumot va xotira</span>
          <span className="settings-menu-arrow">›</span>
        </div>
        
        <div className="settings-menu-item">
          <span className="settings-menu-icon">💻</span>
          <span className="settings-menu-text">Qurilmalar</span>
          <span className="settings-menu-arrow">›</span>
        </div>
        
        <div className="settings-menu-item">
          <span className="settings-menu-icon">🌐</span>
          <span className="settings-menu-text">Til</span>
          <span className="settings-language-label">O'zbek</span>
          <span className="settings-menu-arrow">›</span>
        </div>
      </div>
      
      <h3 className="settings-section-title">Yordam</h3>
      <div style={{ 
        width: '100%', 
        height: '10px', 
        background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'12\' viewBox=\'0 0 20 12\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M6 12c0-6.627-5.373-12-12-12-6.627 0-12 5.373-12 12s5.373 12 12 12c6.627 0 12-5.373 12-12zm-12 10c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm-6-10c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6-6 2.686-6 6z\' fill=\'%23008c8c\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        marginBottom: '10px',
        opacity: 0.5
      }}></div>
      
      <div className="settings-menu-section">
        <div className="settings-menu-item">
          <span className="settings-menu-icon">💬</span>
          <span className="settings-menu-text">Savol berish</span>
          <span className="settings-menu-arrow">›</span>
        </div>
        
        <div className="settings-menu-item">
          <span className="settings-menu-icon">ℹ️</span>
          <span className="settings-menu-text">Istan haqida savollar</span>
          <span className="settings-menu-arrow">›</span>
        </div>
        
        <div className="settings-menu-item">
          <span className="settings-menu-icon">📋</span>
          <span className="settings-menu-text">Maxfiylik siyosati</span>
          <span className="settings-menu-arrow">›</span>
        </div>
      </div>
      
      <button onClick={handleLogout} className="settings-logout-button">
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
          </svg>
          Chiqish
        </span>
        <svg className="settings-logout-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
      </button>
    </div>
  );
};

export default Settings;