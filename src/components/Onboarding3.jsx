import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailIcon from '../assets/email-icon.png';
import './onboarding.css'; // Import common CSS

const Onboarding3 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Login');
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
        <h1 className="title">Istan - sizning <br/>asosiy pochtangiz</h1>
        <img src={emailIcon} alt="Email Icon" className="onboarding-image" />
        <p className="description">
          Amerikalikda Gmail bor.<br/>
          Rasiyalikda Email bor.<br/>
          Sizda-chi?<br/>
          Albatta, IstanMail – O'zbekona, zamonaviy<br/>
          va o'zimizniki!
        </p>
      </div>

      <div className="bottom-section">
        <div className="progress-indicator">
          <div className="progress-bar-background">
            <div className="progress-bar-foreground" style={{ width: '100%' }}></div>
          </div>
          <span className="progress-text">3/3</span>
        </div>
        <button className="continue-button" onClick={() => navigate('/Login')}>
          Davom etish
        </button>
      </div>
    </div>
  );
};

export default Onboarding3;