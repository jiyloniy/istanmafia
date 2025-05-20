import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import internetIcon from '../assets/internet-icon.png'; // Rasm importi o'zgartirilmagan
import './onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding2');
    }, 5000); // Avtomatik o'tish vaqti

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="onboarding-container">
      <div className="top-bar">
        <span className="skip-button" onClick={() => navigate('/Login')}>
          O'tkazib yuborish
        </span>
      </div>

      <div className="main-content2">
        <h1 className="title">Istan bu - tekin internet</h1>
        <img src={internetIcon} alt="Internet Icon" className="onboarding-image" />
        <p className="description">
          Istan dasturi orqali O'zbekiston hududida internet paket(Mb) sariflamasdan foydalaning
        </p>
      </div>

      <div className="bottom-section">
        <div className="progress-indicator">
          <div className="progress-bar-background">
            <div className="progress-bar-foreground"></div>
          </div>
          <span className="progress-text">1/3</span>
        </div>
        <button className="continue-button" onClick={() => navigate('/onboarding2')}>
          Davom etish
        </button>
      </div>
    </div>
  );
};

export default Onboarding; 