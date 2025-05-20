import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import instaImg from '../assets/default.png';
import { API_URL, API_URL2, ENDPOINTS } from '../config/api';
import lightBulb from '../assets/image 18 (3).png';
import englifyIcon from '../assets/image (4).png';
import sejongIcon from '../assets/image (6).png';
import languageIcon from '../assets/image 18 (3).png';
import schoolGraduation from '../assets/123.jpg';
import medal from '../assets/1234.jpg';
import university from '../assets/Main.jpg';
import portfoli1 from '../assets/Depth 5, Frame 0.png';
import portfolio2 from '../assets/Depth 5, Frame 0 (1).png';
import portfolio3 from '../assets/Depth 5, Frame 0 (2).png';



const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('asosiy');
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

 

  const itSkills = [
    { name: 'Testlab: IT tushunchasi', score: 8, maxScore: 10, date: '2024-04-14' },
    { name: 'IT Park: Python', score: 7, maxScore: 10, date: '2024-04-14' },
    { name: 'Testlab: Algoritm', score: 8, maxScore: 10, date: '2024-04-14' }
  ];

  const languages = [
    { name: 'Englify: Ingliz tili', score: 8, maxScore: 10, date: '2024-04-14' },
    { name: 'King Sejong: Koreys tili', score: 7, maxScore: 10, date: '2024-04-14' },
    { name: 'Testlab: Rus tili', score: 8, maxScore: 10, date: '2024-04-14' }
  ];

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

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'asosiy' ? 'active' : ''}`}
          onClick={() => setActiveTab('asosiy')}
        >
          Asosiy
        </button>
        <button
          className={`tab-btn ${activeTab === 'videolar' ? 'active' : ''}`}
          onClick={() => setActiveTab('videolar')}
        >
          Videolar        </button>
        <button
          className={`tab-btn ${activeTab === 'rasmlar' ? 'active' : ''}`}
          onClick={() => setActiveTab('rasmlar')}
        >
          Rasmlar
        </button>
        <button
          className={`tab-btn ${activeTab === 'malumotlar' ? 'active' : ''}`}
          onClick={() => setActiveTab('malumotlar')}
        >
          Ma'lutmotlar
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

      {activeTab === 'malumotlar' && (
        <div>
          <h2 className="section-title">Ko'nikmalar</h2>
          <div className="skills-tags">
            <span className="skill-tag">Dasturchilik</span>
            <span className="skill-tag">PM-manager</span>
            <span className="skill-tag">Python</span>
            <span className="skill-tag">Django</span>
            <span className="skill-tag">1C dasturi</span>
          </div>

          <h2 className="section-title">Yutuqlar</h2>
          <div className="achievement-list">
            <div className="achievement-item">
              <div className="achievement-content">
                <h3 className="achievement-title">Asaka tuman 24-DIMI ni tamomlagan</h3>
                <div className="achievement-meta">Maktab · 2022</div>
              </div>
              <img className="achievement-image" src={schoolGraduation} alt="School graduation" />
            </div>
            <div className="achievement-item">
              <div className="achievement-content">
                <h3 className="achievement-title">Prezident tomonidan 16 yoshda shuhrat medali</h3>
                <div className="achievement-meta">Mukofot · 2021</div>
              </div>
              <img className="achievement-image" src={medal} alt="Medal" />
            </div>
            <div className="achievement-item">
              <div className="achievement-content">
                <h3 className="achievement-title">KIUF universitetiga GRAND yutuq'i</h3>
                <div className="achievement-meta">Yutuq · 2022</div>
              </div>
              <img className="achievement-image" src={university} alt="University" />
            </div>
          </div>

          <h2 className="section-title">Portfolio</h2>
          <div className="portfolio-grid">
            <div className="portfolio-item">
              <img className="portfolio-image" src={portfoli1} alt="Portfolio 1" />
              <h3 className="portfolio-title">UI Design for a cooking app</h3>
            </div>
            <div className="portfolio-item">
              <img className="portfolio-image" src={portfolio2} alt="Portfolio 2" />
              <h3 className="portfolio-title">Website design for a furniture brand</h3>
            </div>
            <div className="portfolio-item">
              <img className="portfolio-image" src={portfolio3} alt="Portfolio 3" />
              <h3 className="portfolio-title">Mobile app design for a rental service</h3>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {activeTab === 'asosiy' && (
        <div className="profile-content">
          {/* IT Skills Section */}
          <div className="skills-section">
            <h2>IT bilimlar</h2>
            {itSkills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-icon">
                  <img src={lightBulb} alt="IT skill" className="skill-icon-img" />
                </div>
                <div className="skill-details">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-score">{skill.score}/{skill.maxScore}</span>
                  </div>
                  <div className="skill-progress">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${(skill.score / skill.maxScore) * 100}%` }}
                    ></div>
                  </div>
                  <span className="skill-date">{skill.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Languages Section */}
          <div className="skills-section">
            <h2>Chet tillari</h2>
            {languages.map((lang, index) => (
              <div key={index} className="skill-item">
                <div className="skill-icon language-icon">
                  <img 
                    src={index === 0 ? englifyIcon : 
                         index === 1 ? sejongIcon : 
                         languageIcon} 
                    alt={lang.name} 
                    className="skill-icon-img" 
                  />
                </div>
                <div className="skill-details">
                  <div className="skill-header">
                    <span className="skill-name">{lang.name}</span>
                    <span className="skill-score">{lang.score}/{lang.maxScore}</span>
                  </div>
                  <div className="skill-progress">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${(lang.score / lang.maxScore) * 100}%` }}
                    ></div>
                  </div>
                  <span className="skill-date">{lang.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
