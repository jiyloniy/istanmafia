import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import instaImg from '../assets/default.png';
import { API_URL, API_URL2, ENDPOINTS } from '../config/api';




const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rasmlar');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [compactUserInfo, setCompactUserInfo] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchMediaPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}${ENDPOINTS.MEDIA_FILTERED_POSTS_MEDIA}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      if (data.status === 'success' && data.data && data.data.posts) {
        setPosts(data.data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompactUserInfo = async () => {
    try {
      const response = await fetch(`${API_URL}${ENDPOINTS.PROFILE_COMPACT}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error('Failed to fetch compact user info');
      }
      const data = await response.json();
      if (data.status === 'success' && data.data) {
        console.log(data.data);
        setCompactUserInfo(data.data);
      }
    } catch (error) {
      console.error('Error fetching compact user info:', error);
    }
  };

  useEffect(() => {
    fetchMediaPosts();
    fetchCompactUserInfo();
  }, [page]);

 


  return (
    <div className="profile-container">
      {/* Header with back button and menu */}
      <div className="profile-header2">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
          </svg>
        </button>
        <button className="menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* Profile Info Section */}
      <div className="profile-info-section2">
        <div className="profile-main-info2">
          <div className="profile-badge2">
            <span>{compactUserInfo?.profession?.[0]?.name || 'IT'} 
              
             
            </span>
            <span style={{color: 'gold', fontSize: '16px' , gap: '2px',padding: '2px'}}>{`\u2605`.repeat(1)} 5</span>
          </div>
          <div className="profile-image2">
            <img src={API_URL2 + compactUserInfo?.user?.profile_picture || instaImg} alt="Profile" />
          </div>
          <div className="profile-stats2">
            <div className="stat-item2">
              <span className="stat-number2">{compactUserInfo?.stats?.post_count || 5}</span>
              <span className="stat-label2">Postlar</span>
            </div>
            <div className="stat-item2">
              <span className="stat-number2">{compactUserInfo?.stats?.follower_count || 2}</span>
              <span className="stat-label2">Obunachilar</span>
            </div>
            <div className="stat-item2">
              <span className="stat-number2">{compactUserInfo?.stats?.following_count || 2}</span>
              <span className="stat-label2">Kuzatishda</span>
            </div>
          </div>
        </div>

        <div className="profile-details2">
          <h1 className="profile-name2">{compactUserInfo?.user?.full_name || 'Qodirxon Yusufjanov'}</h1>
          <p className="profile-contact">{compactUserInfo?.user?.phone || '+998500049297'}</p>
          {compactUserInfo?.user?.bio && (
            <p className="profile-bio2">{compactUserInfo.user.bio}</p>
          )}
          {compactUserInfo?.user?.username && (
            <p className="profile-email">{compactUserInfo.user.username}</p>
          )}
        </div>
        
      </div>

      {/* Navigation Tabs */}      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'videolar' ? 'active' : ''}`}
          onClick={() => setActiveTab('videolar')}
        >
          Videolar
        </button>
        <button
          className={`tab-btn ${activeTab === 'rasmlar' ? 'active' : ''}`}
          onClick={() => setActiveTab('rasmlar')}
        >
          Rasmlar
        </button>
      </div>

      {/* Media Content */}
      {activeTab === 'rasmlar' && (
        <div className="media-grid">
          {posts.filter(post => post.main_media.media_type === 'image').map((post) => (
            <div key={post.id} className="media-item">
              <img src={`${API_URL2}${post.main_media.file_url}`} alt={post.caption} />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'videolar' && (
        <div className="media-grid">
          {posts.filter(post => post.main_media.media_type === 'video').map((post) => (
            <div key={post.id} className="media-item video-item">
              <video src={`${API_URL2}${post.main_media.file_url}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
