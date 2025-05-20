import React, { useState } from 'react';
import './bioEditModal.css';

const BioEditModal = ({ currentBio, onClose, onSave }) => {
  const [bio, setBio] = useState(currentBio || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!bio.trim()) return;
    
    setIsLoading(true);
    const success = await onSave(bio);
    if (success) {
      onClose();
    } else {
      alert('Bio yangilanmadi. Qaytadan urinib ko\'ring');
    }
    setIsLoading(false);
  };

  return (
    <div className="bio-edit-overlay">
      <div className="bio-edit-modal">
        <div className="bio-edit-header">
          <h3>Tahrirlash</h3>
          <button onClick={onClose} className="bio-close-btn">\u2715</button>
        </div>
        
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="O'zingiz haqingizda yozing..."
          maxLength={150}
          className="bio-textarea"
        />
        
        <div className="bio-edit-footer">
          <span className="bio-char-count">{bio.length}/150</span>
          <button 
            onClick={handleSubmit} 
            className="bio-save-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader"></div>
            ) : 'Saqlash'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BioEditModal;
