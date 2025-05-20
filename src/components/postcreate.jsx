// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './postcreate.css';

// const PostCreate = ({ onClose }) => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('post');
//   const [mediaFiles, setMediaFiles] = useState([]);
//   const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
//   const [isRecording, setIsRecording] = useState(false);
//   const [liveTitle, setLiveTitle] = useState('');
//   const [storyText, setStoryText] = useState('');
//   const [showStoryTextInput, setShowStoryTextInput] = useState(false);
  
//   const fileInputRef = useRef(null);
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);
  
//   // Handle file selection for Post and Story
//   const handleFileSelect = (event) => {
//     const files = Array.from(event.target.files);
//     if (files.length === 0) return;
    
//     const newMediaFiles = files.map(file => ({
//       file,
//       url: URL.createObjectURL(file),
//       type: file.type.startsWith('image/') ? 'image' : 'video'
//     }));
    
//     setMediaFiles([...mediaFiles, ...newMediaFiles]);
//     setSelectedMediaIndex(mediaFiles.length);
//   };
  
//   // Remove a selected media file
//   const removeMedia = (index) => {
//     const newMediaFiles = [...mediaFiles];
//     URL.revokeObjectURL(newMediaFiles[index].url);
//     newMediaFiles.splice(index, 1);
//     setMediaFiles(newMediaFiles);
    
//     if (selectedMediaIndex >= newMediaFiles.length) {
//       setSelectedMediaIndex(Math.max(0, newMediaFiles.length - 1));
//     }
//   };
  
//   // Start camera for Live
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         streamRef.current = stream;
//       }
//     } catch (error) {
//       console.error('Error accessing camera:', error);
//     }
//   };
  
//   // Stop camera when leaving Live tab
//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//       if (videoRef.current) {
//         videoRef.current.srcObject = null;
//       }
//     }
//   };
  
//   // Toggle recording state for Live
//   const toggleRecording = () => {
//     setIsRecording(!isRecording);
//   };
  
//   // Handle tab change
//   const handleTabChange = (tab) => {
//     if (tab === 'live') {
//       startCamera();
//     } else if (activeTab === 'live') {
//       stopCamera();
//     }
//     setActiveTab(tab);
//   };
  
//   // Clean up on component unmount
//   useEffect(() => {
//     return () => {
//       // Revoke all object URLs to prevent memory leaks
//       mediaFiles.forEach(media => URL.revokeObjectURL(media.url));
//       stopCamera();
//     };
//   }, [mediaFiles]);
  
//   // Render the Post tab content
//   const renderPostTab = () => (
//     <div className="post-tab">
//       <div className="media-preview">
//         {mediaFiles.length > 0 ? (
//           mediaFiles[selectedMediaIndex].type === 'image' ? (
//             <img 
//               src={mediaFiles[selectedMediaIndex].url} 
//               alt="Preview" 
//               className="media-preview-image" 
//             />
//           ) : (
//             <video 
//               src={mediaFiles[selectedMediaIndex].url} 
//               controls 
//               className="media-preview-image" 
//             />
//           )
//         ) : (
//           <div className="media-preview-placeholder">
//             <div className="placeholder-icon">📷</div>
//             <div className="placeholder-text">Yuklash uchun rasmlar yoki videolarni tanlang</div>
//             <button 
//               className="upload-button" 
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
//                 <polyline points="17 8 12 3 7 8" />
//                 <line x1="12" y1="3" x2="12" y2="15" />
//               </svg>
//               Rasmlar tanlash
//             </button>
//           </div>
//         )}
//       </div>
      
//       <div className="media-controls">
//         {mediaFiles.length > 0 ? (
//           <>
//             <div className="media-thumbnails">
//               {mediaFiles.map((media, index) => (
//                 <div 
//                   key={index} 
//                   className={`media-thumbnail ${selectedMediaIndex === index ? 'active' : ''}`}
//                   onClick={() => setSelectedMediaIndex(index)}
//                 >
//                   {media.type === 'image' ? (
//                     <img src={media.url} alt={`Thumbnail ${index}`} />
//                   ) : (
//                     <video src={media.url} />
//                   )}
//                   <div 
//                     className="remove-thumbnail" 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeMedia(index);
//                     }}
//                   >
//                     ×
//                   </div>
//                 </div>
//               ))}
//               <div 
//                 className="media-thumbnail" 
//                 onClick={() => fileInputRef.current?.click()}
//                 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}
//               >
//                 +
//               </div>
//             </div>
//             <button className="upload-button">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M12 5v14M5 12h14" />
//               </svg>
//               Yangi post yaratish
//             </button>
//           </>
//         ) : (
//           <input 
//             type="file" 
//             ref={fileInputRef} 
//             className="file-input" 
//             accept="image/*,video/*" 
//             multiple 
//             onChange={handleFileSelect} 
//           />
//         )}
//       </div>
//     </div>
//   );
  
//   // Render the Story tab content
//   const renderStoryTab = () => (
//     <div className="story-tab">
//       <div className="story-preview">
//         {mediaFiles.length > 0 && selectedMediaIndex < mediaFiles.length ? (
//           mediaFiles[selectedMediaIndex].type === 'image' ? (
//             <img 
//               src={mediaFiles[selectedMediaIndex].url} 
//               alt="Story Preview" 
//               className="story-preview-image" 
//             />
//           ) : (
//             <video 
//               src={mediaFiles[selectedMediaIndex].url} 
//               controls 
//               className="story-preview-image" 
//             />
//           )
//         ) : (
//           <div className="media-preview-placeholder" style={{ color: 'white' }}>
//             <div className="placeholder-icon">📱</div>
//             <div className="placeholder-text">Story uchun rasm yoki video tanlang</div>
//             <button 
//               className="upload-button" 
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
//                 <polyline points="17 8 12 3 7 8" />
//                 <line x1="12" y1="3" x2="12" y2="15" />
//               </svg>
//               Rasm tanlash
//             </button>
//           </div>
//         )}
//       </div>
      
//       {mediaFiles.length > 0 && (
//         <>
//           <div className="story-text-controls">
//             <button 
//               className="story-text-button" 
//               onClick={() => setShowStoryTextInput(!showStoryTextInput)}
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
//                 <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
//               </svg>
//             </button>
//             <button className="story-text-button">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
//                 <circle cx="8.5" cy="8.5" r="1.5" />
//                 <polyline points="21 15 16 10 5 21" />
//               </svg>
//             </button>
//             <button className="story-text-button">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M12 20h9" />
//                 <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
//               </svg>
//             </button>
//           </div>
          
//           <div className="story-controls">
//             <button className="story-control-button">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10" />
//                 <path d="M12 8v8M8 12h8" />
//               </svg>
//             </button>
//             <button className="story-upload-button">
//               Storiyga joylash
//             </button>
//             <button className="story-control-button">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10" />
//                 <path d="M8 14s1.5 2 4 2 4-2 4-2" />
//                 <line x1="9" y1="9" x2="9.01" y2="9" />
//                 <line x1="15" y1="9" x2="15.01" y2="9" />
//               </svg>
//             </button>
//           </div>
//         </>
//       )}
      
//       <input 
//         type="file" 
//         ref={fileInputRef} 
//         className="file-input" 
//         accept="image/*,video/*" 
//         onChange={handleFileSelect} 
//       />
//     </div>
//   );
  
//   // Render the Live tab content
//   const renderLiveTab = () => (
//     <div className="live-tab">
//       <div className="live-preview">
//         <video 
//           ref={videoRef} 
//           autoPlay 
//           playsInline 
//           muted 
//           className="live-camera-view" 
//         />
//       </div>
      
//       <div className="live-title-container">
//         <input 
//           type="text" 
//           className="live-title-input" 
//           placeholder="Live uchun sarlavha..." 
//           value={liveTitle} 
//           onChange={(e) => setLiveTitle(e.target.value)} 
//         />
//       </div>
      
//       <div className="live-settings">
//         <button className="live-setting-button">
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <circle cx="12" cy="12" r="3" />
//             <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
//           </svg>
//         </button>
//         <button className="live-setting-button">
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
//             <circle cx="12" cy="13" r="4" />
//           </svg>
//         </button>
//         <button className="live-setting-button">
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
//             <path d="M19 10v2a7 7 0 01-14 0v-2" />
//             <line x1="12" y1="19" x2="12" y2="23" />
//             <line x1="8" y1="23" x2="16" y2="23" />
//           </svg>
//         </button>
//       </div>
      
//       <div className="live-controls">
//         <button className="live-control-button">
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7c0-1.1.9-2 2-2z" />
//           </svg>
//         </button>
//         <button 
//           className={`live-control-button go-live ${isRecording ? 'recording' : ''}`}
//           onClick={toggleRecording}
//         >
//           {isRecording ? 'LIVE' : 'GO LIVE'}
//         </button>
//         <button className="live-control-button">
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M23 7l-7 5 7 5V7z" />
//             <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
  
//   return (
//     <div className="post-create-container">
//       {/* Header */}
//       <div className="post-create-header">
//         <div className="header-left">
//           <button onClick={onClose} className="back-button">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="19" y1="12" x2="5" y2="12" />
//               <polyline points="12 19 5 12 12 5" />
//             </svg>
//           </button>
//           <h1 className="header-title">
//             {activeTab === 'post' ? 'Yangi post' : activeTab === 'story' ? 'Yangi story' : 'Live efir'}
//           </h1>
//         </div>
//         <button 
//           className="next-button" 
//           disabled={activeTab === 'post' && mediaFiles.length === 0}
//         >
//           {activeTab === 'live' ? 'Boshlash' : 'Keyingi'}
//         </button>
//       </div>
      
//       {/* Tab Navigation */}
//       <div className="tab-navigation">
//         <button 
//           className={`tab-button ${activeTab === 'post' ? 'active' : ''}`}
//           onClick={() => handleTabChange('post')}
//         >
//           Post
//         </button>
//         <button 
//           className={`tab-button ${activeTab === 'story' ? 'active' : ''}`}
//           onClick={() => handleTabChange('story')}
//         >
//           Story
//         </button>
//         <button 
//           className={`tab-button ${activeTab === 'live' ? 'active' : ''}`}
//           onClick={() => handleTabChange('live')}
//         >
//           Live
//         </button>
//       </div>
      
//       {/* Content Area */}
//       <div className="post-create-content">
//         {activeTab === 'post' && renderPostTab()}
//         {activeTab === 'story' && renderStoryTab()}
//         {activeTab === 'live' && renderLiveTab()}
//       </div>
//     </div>
//   );
// };

// // Make sure the component is properly exported
// export default PostCreate;
