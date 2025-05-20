import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './postcreate.css';
import PostEdit from './PostEdit';
import { API, API_HEADERS_MULTIPART, getTokens } from '../config/api';

const CreatePost = ({ onClose }) => {
  const navigate = useNavigate(); // Add useNavigate hook
  const [activeTab, setActiveTab] = useState('post');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [liveTitle, setLiveTitle] = useState('');
  const [storyText, setStoryText] = useState('');
  const [showStoryTextInput, setShowStoryTextInput] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [tabsLocked, setTabsLocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  
  // Log when component renders
  useEffect(() => {
    console.log('CreatePost component rendered');
    console.log('fileInputRef initialized:', fileInputRef.current);
  }, []);
  
  // Handle file selection for Post and Story
  const handleFileSelect = (event) => {
    console.log('File selection triggered');
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    // Validate file types (only images and videos)
    const validFiles = files.filter(file => {
      return file.type.startsWith('image/') || file.type.startsWith('video/');
    });
    
    if (validFiles.length === 0) {
      alert('Iltimos, faqat rasm yoki video fayllarini tanlang');
      return;
    }
    
    // Check video duration for Story tab (max 1 minute)
    const processFiles = () => {
      // Simulate upload progress
      setIsUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadProgress(0);
          
          // Once "upload" is complete, add the files
          const newMediaFiles = validFiles.map(file => ({
            file,
            url: URL.createObjectURL(file),
            type: file.type.startsWith('image/') ? 'image' : 'video',
            id: Date.now() + Math.random().toString(36).substr(2, 9) // Add unique ID to each file
          }));
          
          setMediaFiles(prev => [...prev, ...newMediaFiles]);
          setSelectedMediaIndex(mediaFiles.length);
          
          // Lock tabs after content is selected
          if (newMediaFiles.length > 0) {
            setTabsLocked(true);
          }
        }
      }, 100);
    };
    
    if (activeTab === 'story') {
      const videoFiles = validFiles.filter(file => file.type.startsWith('video/'));
      if (videoFiles.length > 0) {
        let validDuration = true;
        let checkedCount = 0;
        
        videoFiles.forEach(file => {
          const video = document.createElement('video');
          video.preload = 'metadata';
          
          video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(video.src);
            checkedCount++;
            
            if (video.duration > 60) { // 60 seconds = 1 minute
              validDuration = false;
            }
            
            // When all videos are checked
            if (checkedCount === videoFiles.length) {
              if (!validDuration) {
                alert('Story uchun video davomiyligi maksimum 1 minut bo\'lishi kerak');
                return;
              } else {
                processFiles();
              }
            }
          };
          
          video.src = URL.createObjectURL(file);
        });
      } else {
        // No video files, just images
        processFiles();
      }
    } else {
      // Not story tab, process all files
      processFiles();
    }
  };
  
  // Remove a selected media file
  const removeMedia = (index) => {
    const newMediaFiles = [...mediaFiles];
    URL.revokeObjectURL(newMediaFiles[index].url);
    newMediaFiles.splice(index, 1);
    setMediaFiles(newMediaFiles);
    
    if (selectedMediaIndex >= newMediaFiles.length) {
      setSelectedMediaIndex(Math.max(0, newMediaFiles.length - 1));
    }
  };
  
  // Start camera for Live
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  
  // Stop camera when leaving Live tab
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };
  
  // Toggle recording state for Live
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };
  
  // Handle tab change
  const handleTabChange = (tab) => {
    // Prevent tab switching if tabs are locked (content already selected)
    if (tabsLocked && mediaFiles.length > 0) {
      // Show a toast or notification that user can't switch tabs after content selection
      alert('Kontentni tanlagandan keyin boshqa tabga o\'tish mumkin emas. Yangi post yaratish uchun avval joriy postni yakunlang.');
      return;
    }
    
    if (tab === 'live') {
      startCamera();
    } else if (activeTab === 'live') {
      stopCamera();
    }
    setActiveTab(tab);
  };
  
  // Clean up on component unmount
  useEffect(() => {
    return () => {
      // Revoke all object URLs to prevent memory leaks
      mediaFiles.forEach(media => URL.revokeObjectURL(media.url));
      stopCamera();
    };
  }, [mediaFiles]);
  
  // Function to remove all media
  const clearAllMedia = () => {
    mediaFiles.forEach(media => URL.revokeObjectURL(media.url));
    setMediaFiles([]);
    setSelectedMediaIndex(0);
    setTabsLocked(false);
  };
  
  // Use clearAllMedia when needed
  const resetContent = () => {
    clearAllMedia();
    setStoryText('');
    setShowStoryTextInput(false);
  };

  // Render the Post tab content
  const renderPostTab = () => (
    <div className="post-tab">
      <div className="media-preview">
        {isUploading ? (
          <div className="upload-progress-container">
            <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
            <div className="upload-progress-text">{uploadProgress}% Uploading...</div>
          </div>
        ) : mediaFiles.length > 0 ? (
          mediaFiles[selectedMediaIndex].type === 'image' ? (
            <img 
              src={mediaFiles[selectedMediaIndex].url} 
              alt="Preview" 
              className="media-preview-image" 
            />
          ) : (
            <video 
              src={mediaFiles[selectedMediaIndex].url} 
              controls 
              className="media-preview-image" 
            />
          )
        ) : (
          <div className="media-preview-placeholder">
            <div className="placeholder-icon">📷</div>
            <div className="placeholder-text">Yuklash uchun rasmlar yoki videolarni tanlang</div>
            <button 
              className="upload-button" 
              onClick={() => fileInputRef.current?.click()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Contentlarni tanlash
            </button>
          </div>
        )}
      </div>
      
      <div className="media-controls">
        {mediaFiles.length > 0 ? (
          <>
            <div className="media-thumbnails">
              {mediaFiles.map((media, index) => (
                <div 
                  key={index} 
                  className={`media-thumbnail ${selectedMediaIndex === index ? 'active' : ''}`}
                  onClick={() => setSelectedMediaIndex(index)}
                >
                  {media.type === 'image' ? (
                    <img src={media.url} alt={`Thumbnail ${index}`} />
                  ) : (
                    <video src={media.url} />
                  )}
                  <div 
                    className="remove-thumbnail" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMedia(index);
                    }}
                  >
                    ×
                  </div>
                </div>
              ))}
              <div 
                className="media-thumbnail" 
                onClick={() => fileInputRef.current?.click()}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}
              >
                +
              </div>
            </div>
            <button 
              className="upload-button"
              onClick={() => setShowEditPage(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Yangi post yaratish
            </button>
          </>
        ) : (
          <input 
            type="file" 
            ref={fileInputRef} 
            className="file-input" 
            accept="image/*,video/*" 
            multiple 
            onChange={handleFileSelect} 
          />
        )}
      </div>
    </div>
  );
  
  // Render the Story tab content
  const renderStoryTab = () => {
    // Use the main handleSubmitStory function
    const handleStorySubmit = () => {
      // Call the main story submission function
      handleSubmitStory();
    };
    
    // Function to handle text size change
    const handleTextSizeChange = (size) => {
      const textArea = document.querySelector('.story-text-input');
      if (textArea) {
        switch(size) {
          case 'small':
            textArea.style.fontSize = '16px';
            break;
          case 'medium':
            textArea.style.fontSize = '24px';
            break;
          case 'large':
            textArea.style.fontSize = '32px';
            break;
          default:
            textArea.style.fontSize = '24px';
        }
      }
    };
    
    // Function to handle text color change
    const handleTextColorChange = (color) => {
      const textArea = document.querySelector('.story-text-input');
      if (textArea) {
        textArea.style.color = color;
      }
    };
    
    // Function to handle text alignment
    const handleTextAlignment = (alignment) => {
      const textArea = document.querySelector('.story-text-input');
      if (textArea) {
        textArea.style.textAlign = alignment;
      }
    };
    
    return (
      <div className="story-tab" style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="story-preview" style={{ backgroundColor: '#f0f0f0', flex: 1, position: 'relative' }}>
          {isUploading ? (
            <div className="upload-progress-container">
              <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
              <div className="upload-progress-text">{uploadProgress}% Uploading...</div>
            </div>
          ) : mediaFiles.length > 0 && selectedMediaIndex < mediaFiles.length ? (
            <div className="story-media-container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {mediaFiles[selectedMediaIndex].type === 'image' ? (
                <img 
                  src={mediaFiles[selectedMediaIndex].url} 
                  alt="Story Preview" 
                  className="story-preview-image" 
                  style={{ objectFit: 'contain', maxHeight: '100%', width: '100%' }}
                />
              ) : (
                <video 
                  src={mediaFiles[selectedMediaIndex].url} 
                  controls 
                  className="story-preview-image" 
                  style={{ objectFit: 'contain', maxHeight: '100%', width: '100%' }}
                />
              )}
              
              {showStoryTextInput && (
                <div className="story-text-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
                  <textarea
                    className="story-text-input"
                    placeholder="Storyga matn qo'shing..."
                    value={storyText}
                    onChange={(e) => setStoryText(e.target.value)}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: 'white', 
                      fontSize: '24px', 
                      textAlign: 'center',
                      width: '80%',
                      height: '50%',
                      resize: 'none',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    }}
                    autoFocus
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="media-preview-placeholder" style={{ color: '#333', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <div className="placeholder-icon" style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
              <div className="placeholder-text" style={{ marginBottom: '20px', fontSize: '16px', textAlign: 'center' }}>Yuklash uchun rasmlar yoki videolarni tanlang</div>
              <label 
                className="upload-button" 
                htmlFor="file-input-story"
                style={{ 
                  backgroundColor: '#00a884', 
                  width: '100%', 
                  maxWidth: '300px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  borderRadius: '4px', 
                  padding: '12px', 
                  color: 'white', 
                  fontWeight: 'bold', 
                  border: 'none', 
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Contentlarni tanlash
              </label>
              <input
                id="file-input-story"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                multiple
              />
            </div>
          )}
        </div>
        

        
        {/* Bottom controls */}
        {/* Media thumbnails for multiple files */}
        {mediaFiles.length > 1 && (
          <div className="media-thumbnails" style={{ display: 'flex', padding: '10px', overflowX: 'auto', backgroundColor: 'white', borderTop: '1px solid #e0e0e0' }}>
            {mediaFiles.map((media, index) => (
              <div 
                key={media.id || index} 
                className={`media-thumbnail ${selectedMediaIndex === index ? 'active' : ''}`}
                onClick={() => setSelectedMediaIndex(index)}
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  margin: '0 5px', 
                  border: selectedMediaIndex === index ? '2px solid #00a884' : '1px solid #e0e0e0',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {media.type === 'image' ? (
                  <img 
                    src={media.url} 
                    alt={`Thumbnail ${index}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <video 
                    src={media.url} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMedia(index);
                  }}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <div 
              className="media-thumbnail add-more" 
              onClick={() => fileInputRef.current?.click()}
              style={{ 
                width: '60px', 
                height: '60px', 
                margin: '0 5px', 
                border: '1px dashed #aaa',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '24px',
                color: '#aaa'
              }}
            >
              +
            </div>
          </div>
        )}
        
        {/* Bottom controls - only show when media is selected */}
        {mediaFiles.length > 0 ? (
          <div className="story-bottom-controls" style={{ display: 'flex', justifyContent: 'center', padding: '15px', borderTop: '1px solid #e0e0e0', backgroundColor: 'white' }}>
            <button 
              className="story-submit-button" 
              onClick={handleStorySubmit}
              disabled={isSubmitting}
              style={{ 
                backgroundColor: '#00a884', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                padding: '12px 24px', 
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                fontSize: '16px',
                width: '100%',
                maxWidth: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              {isSubmitting ? 'Joylanmoqda...' : 'Storiyga joylash'}
            </button>
          </div>
        ) : null}
      </div>
    );
  };
  // Hidden file input for media selection
  const fileInput = (
    <input 
      type="file" 
      ref={fileInputRef} 
      className="file-input" 
      accept="image/*,video/*" 
      onChange={handleFileSelect} 
      style={{ display: 'none' }}
      multiple
    />
  );
  
  // Render the Live tab content
  const renderLiveTab = () => (
    <div className="live-tab">
      <div className="live-preview">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="live-camera-view" 
        />
      </div>
      
      <div className="live-title-container">
        <input 
          type="text" 
          className="live-title-input" 
          placeholder="Live uchun sarlavha..." 
          value={liveTitle} 
          onChange={(e) => setLiveTitle(e.target.value)} 
        />
      </div>
      
      <div className="live-settings">
        <button className="live-setting-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
        <button className="live-setting-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
        <button className="live-setting-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
            <path d="M19 10v2a7 7 0 01-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      </div>
      
      <div className="live-controls">
        <button className="live-control-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7c0-1.1.9-2 2-2z" />
          </svg>
        </button>
        <button 
          className={`live-control-button go-live ${isRecording ? 'recording' : ''}`}
          onClick={toggleRecording}
        >
          {isRecording ? 'LIVE' : 'GO LIVE'}
        </button>
        <button className="live-control-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </button>
      </div>
    </div>
  );
  
  // Direct action button click (replaces Next button)
  const handleActionClick = () => {
    if (mediaFiles.length === 0) {
      // If no media is selected, trigger file selection
      fileInputRef.current?.click();
      return;
    }
    
    if (activeTab === 'post') {
      setShowEditPage(true);
    } else if (activeTab === 'story') {
      // Handle story publishing directly without going to edit page
      handleSubmitStory();
    } else if (activeTab === 'live') {
      // Handle live stream start
      startLiveStream();
    }
  };
  
  // Live stream boshlash va API ga yuborish
  const startLiveStream = async () => {
    if (!streamRef.current) {
      alert('Kamera yoqilmagan. Iltimos, kamerani yoqing.');
      return;
    }
    
    setIsRecording(true);
    
    try {
      // FormData obyektini yaratish
      const formData = new FormData();
      
      // Live stream ma'lumotlarini qo'shish
      formData.append('type', 'live');
      formData.append('timestamp', new Date().toISOString());
      formData.append('title', liveTitle || 'Live Stream');
      
      // API ga yuborish (live stream boshlash)
      const result = await sendDataToAPI('live/start', formData, 'Live efir boshlandi!');
      
      // Live stream ID ni saqlash (keyinchalik to'xtatish uchun)
      const liveStreamId = result.liveStreamId;
      console.log('Live stream started with ID:', liveStreamId);
      
      // Live stream to'xtatish uchun funksiya
      const stopLiveStream = async () => {
        if (!isRecording) return;
        
        try {
          const stopFormData = new FormData();
          stopFormData.append('liveStreamId', liveStreamId);
          
          await sendDataToAPI('live/stop', stopFormData, 'Live efir to\'xtatildi!');
          setIsRecording(false);
          resetContent();
          onClose();
        } catch (error) {
          console.error('Error stopping live stream:', error);
        }
      };
      
      // Live stream to'xtatish tugmasini yaratish (UI da ko'rsatish kerak)
      // Bu yerda faqat funksiyani tayyorlab qo'ydik
    } catch (error) {
      console.error('Error starting live stream:', error);
      setIsRecording(false);
      alert('Live efirni boshlashda xatolik yuz berdi. Qaytadan urinib ko\'ring.');
    }
  };

  // Handle post save
  const handleSavePost = async (postData) => {
    try {
      // Agar media fayllar bo'lmasa, xatolik chiqarish
      if (mediaFiles.length === 0) {
        alert('Iltimos, post uchun rasm yoki video tanlang');
        return;
      }
      
      setIsSubmitting(true);
      setIsUploading(true);
      setUploadProgress(0);
      
      // FormData obyektini yaratish
      const formData = new FormData();
      
      // PostEdit komponentidan kelgan ma'lumotlarni qo'shish
      if (postData.caption) formData.append('caption', postData.caption);
      
      // Joylashuv nomini qo'shish (raqam emas)
      if (postData.location) formData.append('location_name', postData.location);
      
      // Teglarni qo'shish
      if (postData.tags && postData.tags.length > 0) {
        // Teglarni bitta string sifatida qo'shish
        formData.append('tags', postData.tags.join(','));
      }
      
      // Progress simulyatsiyasini boshlash
      const progressInterval = startProgressSimulation();
      
      // Media fayllarni qo'shish - birinchi faylni asosiy fayl sifatida qo'shamiz
      if (mediaFiles.length > 0) {
        formData.append('media', mediaFiles[0].file);
        formData.append('media_type', mediaFiles[0].type === 'image' ? 'image' : 'video');
      }
      
      // Qo'shimcha media fayllar (agar bo'lsa)
      if (mediaFiles.length > 1) {
        for (let i = 1; i < mediaFiles.length; i++) {
          formData.append('additional_media', mediaFiles[i].file);
          formData.append('additional_media_types', mediaFiles[i].type === 'image' ? 'image' : 'video');
        }
      }
      
      // Qo'shimcha sozlamalar
      formData.append('is_public', postData.privacy === 'private' ? 'false' : 'true');
      formData.append('allow_comments', postData.allowComments !== false ? 'true' : 'false');
      formData.append('allow_likes', postData.allowLikes !== false ? 'true' : 'false');
      
      try {
        // API ga yuborish
        await sendDataToAPI(API.POST, formData, 'Post muvaffaqiyatli joylandi!');
        
        // Progress simulyatsiyasini to'xtatish
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        // Muvaffaqiyatli bo'lgandan so'ng home page ga jozibali o'tish
        setTimeout(() => {
          // Animatsiyali o'tish uchun overlay qo'shish
          const successOverlay = document.createElement('div');
          successOverlay.className = 'success-overlay';
          
          // Muvaffaqiyatli yuborilgani haqida xabar
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = '<div class="success-icon">✓</div><p>Post muvaffaqiyatli joylandi!</p>';
          
          // Overlay ga qo'shish
          successOverlay.appendChild(successMessage);
          document.body.appendChild(successOverlay);
          
          // Animatsiya
          setTimeout(() => {
            successOverlay.classList.add('show');
            
            // Animatsiya tugagandan so'ng home page ga o'tish
            setTimeout(() => {
              setIsUploading(false);
              onClose();
              // Home page ga o'tish
              window.location.href = '/';
            }, 1500);
          }, 100);
        }, 500);
      } catch (apiError) {
        // API xatoligi yuz berganda progressni to'xtatish
        clearInterval(progressInterval);
        setUploadProgress(0);
        throw apiError;
      }
    } catch (error) {
      console.error('Post submission error:', error);
      setIsUploading(false);
      alert('Xatolik yuz berdi: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Upload progress simulyatsiyasi
  const startProgressSimulation = () => {
    let progress = 0;
    return setInterval(() => {
      // Progressni oshirish (tezroq va aniqroq)
      progress += 5 + Math.random() * 7;
      
      // 95% gacha simulyatsiya, qolgan 5% haqiqiy yuklash
      if (progress > 95) progress = 95;
      
      // Progressni o'rnatish
      setUploadProgress(Math.min(Math.round(progress), 95));
    }, 200); // Tezroq yangilanish (300ms o'rniga 200ms)
  };
  
  // API ga ma'lumotlarni yuborish uchun umumiy funksiya
  const sendDataToAPI = async (apiUrl, formData, successMessage) => {
    try {
      // Foydalanuvchi tokenini getTokens funksiyasi orqali olish
      const tokens = getTokens();
      const token = tokens.access;
      
      console.log('Sending to API:', apiUrl);
      console.log('FormData contents:', Array.from(formData.entries()));
      console.log('Token:', token ? 'Mavjud' : 'Mavjud emas');
      
      // Fetch API orqali ma'lumotlarni yuborish
      // FormData uchun Content-Type headerini qo'ymaslik kerak, browser o'zi to'g'ri Content-Type ni aniqlaydi
      // Lekin Authorization headerini qo'shish kerak
      const requestOptions = {
        method: 'POST',
        body: formData,
      };
      
      // Agar token mavjud bo'lsa, Authorization headerini qo'shamiz
      if (token) {
        requestOptions.headers = {
          'Authorization': `Bearer ${token}`
        };
      }
      
      const response = await fetch(apiUrl, requestOptions);
      
      // Javobni tekshirish
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.detail || `HTTP error! Status: ${response.status}`;
        } catch (e) {
          errorMessage = `HTTP error! Status: ${response.status}`;
        }
        throw new Error(errorMessage);
      }
      
      const resultText = await response.text();
      let result;
      try {
        result = JSON.parse(resultText);
      } catch (e) {
        console.log('Response is not JSON:', resultText);
        result = { success: true, message: successMessage };
      }
      
      console.log('API response:', result);
      
      // Muvaffaqiyatli yuborilgani haqida xabar
      // alert(successMessage);
      return result;
    } catch (error) {
      console.error('API error:', error);
      alert('Xatolik yuz berdi. Qaytadan urinib ko\'ring: ' + error.message);
      throw error;
    }
  };
  
  // Handle story submission directly
  const handleSubmitStory = async () => {
    if (mediaFiles.length === 0) {
      alert('Iltimos, story uchun rasm yoki video tanlang');
      return;
    }
    
    setIsSubmitting(true);
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // FormData obyektini yaratish
      const formData = new FormData();
      
      // Story ma'lumotlarini qo'shish
      formData.append('content', storyText || ''); // Story matni
      
      // Progress simulyatsiyasini boshlash
      const progressInterval = startProgressSimulation();
      
      try {
        // Media fayllarni qo'shish (birinchi media fayl)
        if (mediaFiles.length > 0) {
          formData.append('media', mediaFiles[0].file);
          formData.append('media_type', mediaFiles[0].type === 'image' ? 'image' : 'video');
        }
        
        // Qo'shimcha ma'lumotlar
        formData.append('duration', '24'); // 24 soat (sekundlarda emas)
        formData.append('is_public', 'true');
        
        // API ga yuborish
        await sendDataToAPI(API.STORY, formData, 'Story muvaffaqiyatli joylandi!');
        
        // Progress simulyatsiyasini to'xtatish
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        // Muvaffaqiyatli bo'lgandan so'ng home page ga jozibali o'tish
        setTimeout(() => {
          // Animatsiyali o'tish uchun overlay qo'shish
          const successOverlay = document.createElement('div');
          successOverlay.className = 'success-overlay';
          
          // Muvaffaqiyatli yuborilgani haqida xabar
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = '<div class="success-icon">✓</div><p>Story muvaffaqiyatli joylandi!</p>';
          
          // Overlay ga qo'shish
          successOverlay.appendChild(successMessage);
          document.body.appendChild(successOverlay);
          
          // Animatsiya
          setTimeout(() => {
            successOverlay.classList.add('show');
            
            // Animatsiya tugagandan so'ng home page ga o'tish
            setTimeout(() => {
              setIsUploading(false);
              resetContent();
              onClose();
              
              // Home page ga o'tish - window.location.href bilan redirect qilish
              // Bu yangi sahifani to'liq qayta yuklaydi
              window.location.href = '/';
              
              // Agar React Router ishlatilgan bo'lsa, quyidagi usulni qo'llash mumkin:
              // history.push('/'); // Bu usul sahifani qayta yuklamasdan o'tkazadi
            }, 2000); // Animatsiya uchun ko'proq vaqt berish
          }, 200);
        }, 500);
      } catch (apiError) {
        // API xatoligi yuz berganda progressni to'xtatish
        clearInterval(progressInterval);
        setUploadProgress(0);
        throw apiError;
      }
    } catch (error) {
      console.error('Story submission error:', error);
      setIsUploading(false);
      alert('Xatolik yuz berdi: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If showing edit page, render PostEdit component
  if (showEditPage) {
    return <PostEdit 
      mediaFiles={mediaFiles} 
      onClose={() => setShowEditPage(false)} 
      onSave={handleSavePost}
      selectedMediaIndex={selectedMediaIndex}
    />;
  }

  // Yuklash holatini ko'rsatish
  if (isSubmitting) {
    return (
      <div className="post-create-container">
        <div className="upload-overlay">
          <div className="spinner"></div>
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-create-container">
      {/* Header */}
      <div className="post-create-header">
        <div className="header-left">
          <button onClick={() => {
            // Call onClose if provided, and navigate back
            if (onClose) onClose();
            navigate(-1); // Navigate back to previous page
          }} className="back-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="header-title">
            {activeTab === 'post' ? 'Yangi post' : activeTab === 'story' ? 'Yangi story' : 'Live efir'}
          </h1>
        </div>
        <button 
          className="action-button" 
          onClick={handleActionClick}
        >
          {mediaFiles.length === 0 ? 'Kontent tanlash' : 
           activeTab === 'post' ? 'Postni yaratish' : 
           activeTab === 'story' ? 'Storini yaratish' : 'Boshlash'}
        </button>
      </div>
      
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'post' ? 'active' : ''} ${tabsLocked && mediaFiles.length > 0 && activeTab !== 'post' ? 'disabled' : ''}`}
          onClick={() => handleTabChange('post')}
          disabled={tabsLocked && mediaFiles.length > 0 && activeTab !== 'post'}
        >
          Post
        </button>
        <button 
          className={`tab-button ${activeTab === 'story' ? 'active' : ''} ${tabsLocked && mediaFiles.length > 0 && activeTab !== 'story' ? 'disabled' : ''}`}
          onClick={() => handleTabChange('story')}
          disabled={tabsLocked && mediaFiles.length > 0 && activeTab !== 'story'}
          style={activeTab === 'story' ? { color: '#00a884', borderBottom: '2px solid #00a884' } : {}}
        >
          Story
        </button>
        <button 
          className={`tab-button ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => handleTabChange('live')}
          disabled={true}
          style={{ opacity: 0.5, cursor: 'not-allowed' }}
        >
          Live
        </button>
      </div>
      
      {/* Content Area */}
      <div className="post-create-content">
        {activeTab === 'post' && renderPostTab()}
        {activeTab === 'story' && renderStoryTab()}
        {activeTab === 'live' && renderLiveTab()}
      </div>
      
      {/* Hidden file input - placed directly in the component */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="file-input" 
        accept="image/*,video/*" 
        onChange={(e) => {
          console.log('File input change event triggered');
          handleFileSelect(e);
        }} 
        style={{ display: 'none' }}
        multiple
      />
    </div>
  );
};

export default CreatePost;
