import React, { useState, useRef, useEffect } from 'react';
// Removed unused import: useNavigate
import './postcreate.css';

const PostEdit = ({ mediaFiles, onClose, onSave, selectedMediaIndex: initialIndex = 0 }) => {
  // Removed unused variable: navigate
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(initialIndex);
  const [localMediaFiles, setLocalMediaFiles] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  // These states are declared but not used yet - keeping them for future functionality
  // const [showTagPeople, setShowTagPeople] = useState(false);
  const [shareWithFriends, setShareWithFriends] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  // const [showDocEditor, setShowDocEditor] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiList] = useState(['😊', '❤️', '👍', '🔥', '😂', '🎉', '🙏', '👏', '💯', '✨']);
  const [taggedPeople, setTaggedPeople] = useState([]);
  
  const fileInputRef = useRef(null);
  const cameraRef = useRef(null);
  const streamRef = useRef(null);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Kamerani ishga tushirishda xatolik yuz berdi');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  // Take photo
  const takePhoto = () => {
    if (cameraRef.current && streamRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = cameraRef.current.videoWidth;
      canvas.height = cameraRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(cameraRef.current, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(blob => {
        const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
        const newMedia = {
          file,
          url: URL.createObjectURL(blob),
          type: 'image'
        };
        onSave && onSave({
          mediaFiles: [...mediaFiles, newMedia],
          caption,
          location,
        });
        stopCamera();
      }, 'image/jpeg');
    }
  };

  // Initialize local media files and clean up camera on unmount
  useEffect(() => {
    // Create local copies of media files to ensure they're properly displayed
    if (mediaFiles && mediaFiles.length > 0) {
      setLocalMediaFiles([...mediaFiles]);
    }
    
    return () => {
      stopCamera();
    };
  }, [mediaFiles]);

  // Handle adding more media
  const handleAddMoreMedia = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files).map(file => ({
        file,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'video',
        id: Date.now() + Math.random().toString(36).substr(2, 9) // Add unique ID
      }));
      
      // Update local state first
      const updatedMediaFiles = [...localMediaFiles, ...newFiles];
      setLocalMediaFiles(updatedMediaFiles);
      
      // Then update parent component
      onSave && onSave({
        mediaFiles: updatedMediaFiles,
        caption,
        location,
      });
    }
  };
  
  // Add emoji to caption
  const addEmoji = (emoji) => {
    setCaption(prev => prev + emoji);
    setShowEmoji(false);
  };
  
  // Handle tag person
  const handleTagPerson = () => {
    const name = prompt('Belgilamoqchi bo\'lgan odamning ismini kiriting:');
    if (name && name.trim()) {
      setTaggedPeople([...taggedPeople, name.trim()]);
    }
  };

  // Handle post submission
  const handleSubmitPost = () => {
    if (caption.trim() === '') {
      alert('Iltimos, post uchun matn kiriting');
      return;
    }
    
    setIsSubmitting(true);
    setIsPublishing(true);
    
    // Simulate publishing progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setPublishProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Here you would typically send the post data to your backend
        setTimeout(() => {
          onSave && onSave({
            mediaFiles: localMediaFiles, // Use local media files
            caption,
            location,
            shareWithFriends,
          });
          
          // Navigate back to home or show success message
          onClose();
          setIsSubmitting(false);
          setIsPublishing(false);
        }, 500);
      }
    }, 100);
  };
  
  // Handle share location
  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
      });
    }
  };

  return (
    <div className="post-edit-container">
      {/* Camera View */}
      {showCamera && (
        <div className="camera-container">
          <div className="camera-header">
            <button className="camera-close" onClick={stopCamera}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2>Rasm olish</h2>
            <div></div> {/* Empty div for flex spacing */}
          </div>
          <div className="camera-view">
            <video ref={cameraRef} autoPlay playsInline className="camera-video" />
          </div>
          <div className="camera-controls">
            <button className="camera-capture" onClick={takePhoto}>
              <div className="capture-button"></div>
            </button>
          </div>
        </div>
      )}
      
      {/* Text Editor */}
      {showTextEditor && (
        <div className="text-editor-container">
          <div className="text-editor-header">
            <button className="text-editor-close" onClick={() => setShowTextEditor(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2>Matn tahrirlash</h2>
            <button className="text-editor-save" onClick={() => setShowTextEditor(false)}>Saqlash</button>
          </div>
          <div className="text-editor-content">
            <textarea 
              className="text-editor-textarea" 
              value={caption} 
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Matnni kiriting..."
              autoFocus
            />
          </div>
          <div className="text-editor-tools">
            <button className="text-tool-button" onClick={() => setShowEmoji(true)}>
              <span>😊</span>
            </button>
            <button className="text-tool-button">
              <span>B</span>
            </button>
            <button className="text-tool-button">
              <span>I</span>
            </button>
            <button className="text-tool-button">
              <span>U</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Emoji Picker */}
      {showEmoji && (
        <div className="emoji-picker">
          <div className="emoji-picker-header">
            <button onClick={() => setShowEmoji(false)} className="emoji-close-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3>Emoji tanlang</h3>
          </div>
          <div className="emoji-grid">
            {emojiList.map((emoji, index) => (
              <button 
                key={index} 
                className="emoji-button" 
                onClick={() => addEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Header */}
      <div className="post-create-header">
        <div className="header-left">
          <button onClick={onClose} className="back-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="header-title">Post yaratish</h1>
        </div>
        <button 
          className="yuborish-button" 
          onClick={handleSubmitPost}
          disabled={isSubmitting}
          style={{
            backgroundColor: '#00a884',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          {isSubmitting ? 'Joylanmoqda...' : 'Yuborish'}
        </button>
      </div>
      
      {/* Publishing Progress Overlay */}
      {/* {isPublishing && (
        <div className="publishing-overlay">
          <div className="publishing-container">
            <div className="publishing-progress-bar" style={{ width: `${publishProgress}%` }}></div>
            <div className="publishing-text">Post joylanmoqda... {publishProgress}%</div>
          </div>
        </div>
      )} */}
      
      {/* Content Area */}
      <div className="post-edit-content">
        <div className="post-edit-preview">
          {localMediaFiles.length > 0 && selectedMediaIndex < localMediaFiles.length && (
            localMediaFiles[selectedMediaIndex].type === 'image' ? (
              <img 
                src={localMediaFiles[selectedMediaIndex].url} 
                alt="Preview" 
                className="edit-preview-image" 
              />
            ) : (
              <video 
                src={localMediaFiles[selectedMediaIndex].url} 
                controls 
                className="edit-preview-image" 
              />
            )
          )}
          
          {localMediaFiles.length > 1 && (
            <div className="media-thumbnails edit-thumbnails">
              {localMediaFiles.map((media, index) => (
                <div 
                  key={media.id || index} 
                  className={`media-thumbnail ${selectedMediaIndex === index ? 'active' : ''}`}
                  onClick={() => setSelectedMediaIndex(index)}
                >
                  {media.type === 'image' ? (
                    <img src={media.url} alt={`Thumbnail ${index}`} />
                  ) : (
                    <video src={media.url} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="post-edit-form">
          <div className="caption-container">
            <textarea 
              className="caption-input" 
              placeholder="Nimalarni ulashmoqchisiz" 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              autoFocus
            />
          </div>
          
          <div className="edit-options">
            
            <div className="edit-option">
              <span>Joylashuv qo'shish</span>
              <div className="location-input-container">
                <input 
                  type="text" 
                  className="location-input" 
                  placeholder="Joylashuv qo'shish" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {!location && (
                  <button 
                    className="location-button" 
                    onClick={handleShareLocation}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            <div className="edit-option">
              <span>Dostlarga ham ulashish</span>
              <div className="toggle-switch">
                <input 
                  type="checkbox" 
                  id="share-toggle" 
                  className="toggle-input" 
                  checked={shareWithFriends}
                  onChange={() => setShareWithFriends(!shareWithFriends)}
                />
                <label htmlFor="share-toggle" className="toggle-label"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Media Options */}
      <div className="media-options">
        <button className="media-option-button" onClick={() => fileInputRef.current?.click()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </button>
        <button className="media-option-button" onClick={startCamera}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
        </button>
        <button className="media-option-button" onClick={() => setShowTextEditor(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </button>
        <button className="media-option-button" onClick={() => setShowEmoji(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </button>
      </div>
      
      {/* Hidden file input for adding more media */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="file-input" 
        accept="image/*,video/*" 
        multiple 
        onChange={handleAddMoreMedia} 
      />
    </div>
  );
};

export default PostEdit;
