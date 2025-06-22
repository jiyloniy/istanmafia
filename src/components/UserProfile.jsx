import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './profile.css';
import instaImg from '../assets/default.png';
import { API_URL, API_URL2 } from '../config/api';
import { CalendarDays, Heart, Eye, Mail } from 'lucide-react';

const SkeletonCard = () => (
  <div className="article-card skeleton-card">
    <div className="skeleton-image"></div>
    <div className="article-card-content">
      <div className="skeleton-text long"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  </div>
);

const SkeletonGrid = ({ count = 9 }) => (
  <div className="media-grid">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="media-item skeleton-item"></div>
    ))}
  </div>
);

const getFullUrl = (url) => {
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    return url;
  }
  return `${API_URL2}${url}`;
};

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('postlar');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compactUserInfo, setCompactUserInfo] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchUserContent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}user/posts/user/?user_id=${userId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        console.error('Failed to fetch user content');
        return;
      }
      const data = await response.json();
      if (data.status === 'success' && data.data) {
        setContent(data.data.content || []);
      }
    } catch (error) {
      console.error('Error fetching user content:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompactUserInfo = async () => {
    try {
      const response = await fetch(`${API_URL}user/profile/compact/${userId}/`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        console.error('Failed to fetch compact user info');
        return;
      }
      const data = await response.json();
      if (data.data) {
        setCompactUserInfo(data.data);
      }
    } catch (error) {
      console.error('Error fetching compact user info:', error);
    }
  };

  useEffect(() => {
    fetchUserContent();
    fetchCompactUserInfo();
  }, [userId]);

  const posts = useMemo(() =>
    content.filter(
      (item) =>
        item.type === 'post' &&
        item.media.length >= 1 &&
        item.media.every((m) => m.media_type === 'image')
    ),
    [content]
  );

  const videos = useMemo(() =>
    content.filter(
      (item) =>
        item.type === 'post' &&
        item.media.length === 1 &&
        item.media[0].media_type === 'video'
    ),
    [content]
  );

  const articles = useMemo(() =>
    content.filter((item) => item.type === 'article'),
    [content]
  );

  const renderContent = () => {
    if (loading) {
      if (activeTab === 'maqolalar') {
        return (
          <div className="article-list">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        );
      }
      return <SkeletonGrid />;
    }
    switch (activeTab) {
      case 'postlar':
        return posts.length > 0 ? (
          <div className="media-grid">
            {posts.map((post) => (
              <div key={post.id} className="media-item">
                {post.media[0].media_type === 'image' ? (
                  <img src={`${API_URL2}${post.media[0].file_url}`} alt={post.title || 'Post media'} />
                ) : post.media[0].media_type === 'video' ? (
                  <div className="video-item">
                    <video src={`${API_URL2}${post.media[0].file_url}`} />
                    <div className="play-icon-overlay">
                      <svg viewBox="0 0 24 24">
                        <path fill="white" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                      </svg>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-tab-message">Hali postlar yo'q.</p>
        );
      case 'videolar':
        return videos.length > 0 ? (
          <div className="media-grid">
            {videos.map((post) => (
              <div key={post.id} className="media-item video-item">
                <video src={`${API_URL2}${post.media[0].file_url}`} />
                <div className="play-icon-overlay">
                  <svg viewBox="0 0 24 24">
                    <path fill="white" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-tab-message">Hali videolar yo'q.</p>
        );
      case 'maqolalar':
        return articles.length > 0 ? (
          <div className="article-list">
            {articles.map((article) => (
              <div key={article.id} className="article-card">
                {article.media && article.media.length > 0 && (
                  <div className="article-card-image-wrapper">
                    <img
                      src={getFullUrl(article.media[0].file_url)}
                      alt={article.title}
                      className="article-card-image"
                    />
                  </div>
                )}
                <div className="article-card-content">
                  <h3 className="article-card-title">{article.title}</h3>
                  <p className="article-card-excerpt">{article.content?.substring(0, 100)}...</p>
                  <div className="article-card-footer">
                    <div className="footer-item">
                      <CalendarDays size={16} className="footer-icon" />
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="footer-item">
                      <Eye size={16} className="footer-icon" />
                      <span>{article.views_count || 0}</span>
                    </div>
                    <div className="footer-item">
                      <Heart size={16} className="footer-icon" />
                      <span>{article.likes_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-tab-message">Hali maqolalar yo'q.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header2">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <button className="menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor" />
          </svg>
        </button>
      </div>
      {/* STATUS BADGE */}
     
        <div style={{ display: 'flex', justifyContent: 'left', marginTop: '-1px', marginLeft: '140px' }}>
          <span
            style={{
              background: '#1746a2',
              color: '#fff',
              borderRadius: 20,
              padding: '6px 6px',
              fontWeight: 600,
              fontSize: 16,
              display: 'inline-flex',
              alignItems: 'left',
              gap: 6,
            }}
          >
            sulton
          </span>
        </div>
      
      {/* PROFILE IMAGE + STATS */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 2px 1px',
          gap: 0,
        }}
      >
        <div
          style={{
            boxShadow: '0 2px 8px #e0e0e0',
            borderRadius: '50%',
            overflow: 'hidden',
            width: 100,
            height: 100,
            position: 'relative',
            flex: '0 0 auto',
          }}
        >
          <img
            src={compactUserInfo?.user?.profile_picture ? `${API_URL2}${compactUserInfo.user.profile_picture}` : instaImg}
            alt="Profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 30, justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', minWidth: 70 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{compactUserInfo?.stats?.post_count || 0}</div>
            <div style={{ fontSize: 13, color: '#888' }}>Postlar</div>
          </div>
          <div style={{ textAlign: 'center', minWidth: 70 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{compactUserInfo?.stats?.follower_count || 0}</div>
            <div style={{ fontSize: 13, color: '#888' }}>Obunachilar</div>
          </div>
          <div style={{ textAlign: 'center', minWidth: 70 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{compactUserInfo?.stats?.following_count || 0}</div>
            <div style={{ fontSize: 13, color: '#888' }}>Kuzatishda</div>
          </div>
        </div>
      </div>
      {/* NAME, USERNAME, PROFESSION, CONTACT */}
      {compactUserInfo && (
        <div style={{ textAlign: 'left', padding: '0 8px', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 2 }}>{compactUserInfo?.user?.full_name}</div>
          <div style={{ color: '#222', fontSize: 15, marginBottom: 4 }}>{compactUserInfo?.user?.username}</div>
          {/* BIO */}
          {compactUserInfo?.user?.bio && (
            <p style={{ fontSize: 15, color: '#333', marginBottom: 8, marginTop: 0, lineHeight: 1.5 }}>{compactUserInfo.user.bio}</p>
          )}
          {compactUserInfo?.profession?.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {compactUserInfo.profession.map((p) => (
                <span key={p.id} style={{ background: '#eaf4ff', color: '#1746a2', borderRadius: 8, padding: '2px 12px', fontSize: 14, fontWeight: 500 }}>{p.name}</span>
              ))}
            </div>
          )}
          {/* CONTACT INFO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {compactUserInfo?.user?.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 15, color: '#222' }}>
                <a href={`${compactUserInfo.user.phone}`} style={{ color: '#222', textDecoration: 'none' }}>{compactUserInfo.user.phone}</a>
              </div>
            )}
            {compactUserInfo?.user?.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 15, color: '#222' }}>
                <Mail size={16} color="#555" />
                <a href={`mailto:${compactUserInfo.user.email}`} style={{ color: '#222', textDecoration: 'none' }}>{compactUserInfo.user.email}</a>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="profile-tabs">
        <button className={`tab-btn ${activeTab === 'postlar' ? 'active' : ''}`} onClick={() => setActiveTab('postlar')}>
          Postlar
        </button>
        <button className={`tab-btn ${activeTab === 'videolar' ? 'active' : ''}`} onClick={() => setActiveTab('videolar')}>
          Videolar
        </button>
        <button className={`tab-btn ${activeTab === 'maqolalar' ? 'active' : ''}`} onClick={() => setActiveTab('maqolalar')}>
          Maqolalar
        </button>
      </div>
      <div className="profile-content">{renderContent()}</div>
    </div>
  );
};

export default UserProfile;