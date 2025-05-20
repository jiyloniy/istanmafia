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
          <span>‹</span>
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
            <div className="settings-phone-number">{userInfo?.user?.phone || ''}</div>
            <div className="settings-contact-label">Telefon raqamini o'zgartirish uchun bosing</div>
          </div>
          
          <div className="settings-contact-item">
            <div className="settings-username-row">
              <div className="settings-phone-number">{userInfo?.user?.username || userInfo?.user?.email || ''}</div>
              <div className="settings-qr-code">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#00acc1">
                  <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 12h7v7H3v-7zm2 2v3h3v-3H5zm7-2h2v2h-2v-2zm0 4h2v3h-2v-3zm4-4h3v2h-3v-2zm0 4h3v3h-3v-3z"/>
                </svg>
              </div>
            </div>
            <div className="settings-contact-label">username</div>
          </div>
          
          <div className="settings-contact-item" onClick={() => setShowBioModal(true)}>
            <div className="settings-phone-number">{userInfo?.user?.bio || 'Dasturlashni bilish - Tartiblanshi bilishdir !'}</div>
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
          marginTop: "280px",
          
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
        <span>Chiqish</span>
        <svg className="settings-logout-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
      </button>
    </div>
  );
};

export default Settings;