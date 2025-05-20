import React from 'react';
import { useNavigate } from 'react-router-dom';

const MProfile = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="mprofile-container">
      <div className="mprofile-header">
        <button className="back-button" onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <h1>Hello World</h1>
      </div>
    </div>
  );
};

export default MProfile;
