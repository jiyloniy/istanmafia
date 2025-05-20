import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import lockIcon from '../assets/lock-icon.png';
import './onboarding.css'; // Import common CSS

const Onboarding2 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding3');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="onboarding-container">
      <div className="top-bar">
        <span className="skip-button" onClick={() => navigate('/Login')}>
          O'tkazib yuborish
        </span>
      </div>

      <div className="main-content">
        <h1 className="title">Istan bu - <br/> parolsiz olam</h1>
        <img src={lockIcon} alt="Lock Icon" className="onboarding-image" /> 
        <p className="description">
          "Parollar? Ularni eslash – 2023 trendi edi."<br/>
          Endi bitta login bilan hamma joyga kirsiz.<br/>
          Istan bilan zamon bilan hamnafas yuring.
        </p>
      </div>

      <div className="bottom-section">
        <div className="progress-indicator">
          <div className="progress-bar-background">
            <div className="progress-bar-foreground" style={{ width: '66.66%' }}></div>
          </div>
          <span className="progress-text">2/3</span>
        </div>
        <button className="continue-button" onClick={() => navigate('/onboarding3')}>
          Davom etish
        </button>
      </div>
    </div>
  );
};

export default Onboarding2;