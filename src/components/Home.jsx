import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './home.css';
import { API, API_HOST, API_PORT, getTokens, likePost, savePost, addComment, getComments, deleteComment, getStoryFeed, viewStory, getMe, API_URL2, ENDPOINTS, API_URL } from '../config/api';

// Import image assets
// Note: In a real project, you would import actual image files
// These are placeholders for demonstration
import arxiv from '../assets/arxiv.png'
import notfikation from '../assets/notfikation.png'
import message from '../assets/message.png'
import instaImg from '../assets/insta-img.png'
import CreatePost from './CreatePost';
import Default from '../assets/default.png';
import home from '../assets/home.png'
import search from '../assets/search.png'
import addContent from '../assets/add-content.png'
import email from '../assets/email.png'
import apps from '../assets/apps.png'
// Removed unused import: chiqish
import profile2 from '../assets/business_10412163.png'
import profile3 from '../assets/settings_12280787.png'
import profile4 from '../assets/worldwide_811544.png'
import profile5 from '../assets/customer-support_3193153.png'
import profile6 from '../assets/night-mode_3838496 (1).png'
import profile7 from '../assets/letter-i_9215114.png'
import profile8 from '../assets/user_3161848.png'
import profile1 from '../assets/credit-card_12689973.png'
// import Settings from './Settings';
import Notifications from './Notifications';

// Create a preloaded default image to ensure it's always available
const defaultImageUrl = '../assets/default.png';
let preloadedDefaultImage = new Image();
preloadedDefaultImage.src = defaultImageUrl;

const Home = () => {
  const navigate = useNavigate();
  
  // Reference to the actual default image object
  const defaultImageRef = useRef();
  
  // Initialize the default image on component mount
  useEffect(() => {
    // Create an in-memory default image that we can use as a fallback
    const defaultImg = new Image();
    defaultImg.src = Default;
    defaultImageRef.current = defaultImg;
  }, []);
  
  // Utility function to safely handle image URLs and prevent infinite loading loops
  const getSafeImageUrl = (imageUrl, apiPrefix = '') => {
    if (!imageUrl) return Default; // If no image URL, use the imported Default
    if (typeof imageUrl !== 'string') return Default; // If imageUrl is not a string, use Default
    if (imageUrl.startsWith('http')) return imageUrl; // If already a full URL, use as is
    return apiPrefix + imageUrl; // Otherwise, prepend API prefix
  };
  
  // Utility function to handle image loading errors
  const handleImageError = (e) => {
    if (!e || !e.target) return; // Guard against null events
    e.target.onerror = null; // Prevent infinite error loops
    
    // Use the imported Default as a static path
    if (Default && typeof Default === 'string') {
      e.target.src = Default;
    } else {
      // As a last resort, hide the broken image
      e.target.style.display = 'none';
    }
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPostCreate, setShowPostCreate] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [activeStory, setActiveStory] = useState(null);
  const [showStory, setShowStory] = useState(false);
  const [expandedCaptions, setExpandedCaptions] = useState({});
  const [activeMediaIndices, setActiveMediaIndices] = useState({});
  const [touchStart, setTouchStart] = useState({});
  const [touchEnd, setTouchEnd] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState('');
  const [commentTouchStart, setCommentTouchStart] = useState(null);
  const [commentTouchCurrent, setCommentTouchCurrent] = useState(null);
  const [isSwipingComment, setIsSwipingComment] = useState(false);
  const [isClosingComment, setIsClosingComment] = useState(false);
  
  // Stories data state is already declared below
  const [showStoryRow, setShowStoryRow] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [profileVisible, setProfileVisible] = useState(true);
  const [storyCount, setStoryCount] = useState(0);
  
  // Handle scroll to hide stories when scrolling up or down and show profile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const scrollDifference = Math.abs(currentScrollPos - lastScrollPosition);
      
      // Only trigger if scrolling more than a threshold to avoid small scroll movements
      if (scrollDifference > 5 && showStoryRow) {
        // Hide stories and show profile on any significant scroll
        setShowStoryRow(false);
        setProfileVisible(true);
      }
      
      setLastScrollPosition(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPosition, showStoryRow]);
  
  // Posts data state
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  
  // Observer for infinite scrolling
  const observer = useRef();
  const lastPostElementRef = useRef();

  // Fetch stories and user data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getMe();
        if (userResponse && userResponse.status === 'success' && userResponse.data) {
          setUserData(userResponse.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

      const fetchStories = async () => {
      setStoriesLoading(true);
      setStoriesError(null);
      
      // Dummy stories data to use if API fails
     
      
      try {
        const response = await getStoryFeed();
        // console.log('Stories API response:', response);
        
        if (response && response.status === 'success' && response.data && response.data.user_stories) {
          // API returns data in the format shown in the user's message
          setStories(response.data.user_stories);
          
          // Count unviewed stories for the navigation display
          const storyCount = response.data.user_stories.reduce((count, userStory) => {
            const unviewedStories = userStory.stories.filter(story => !story.viewed);
            return count + unviewedStories.length;
          }, 0);
          
          setStoryCount(storyCount);
        } else {
          // console.log('Using dummy stories data');
          setStoryCount(4); // Default count for dummy data
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
        setStoriesError('Failed to load stories');
        setStoryCount(4); // Default count for dummy data
      } finally {
        setStoriesLoading(false);
      }
    };

    fetchStories();
    };
    fetchData();
  }, []);

  // Fetch posts from posts/feed endpoint when component mounts or page changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get user token
        const tokens = getTokens();
        const token = tokens?.access;
        
        if (!token) {
          // console.log('No authentication token found');
          setIsLoading(false);
          return;
        }
        
        // Request options with authorization header
        const requestOptions = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        // Fetch data from posts/feed endpoint with pagination
        const paginatedUrl = `${API.POST_FEED}?page=${page}&limit=10`;
        // console.log('Fetching data from:', paginatedUrl);
        
        const response = await fetch(paginatedUrl, requestOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        // console.log('Posts feed data:', result);
        
        if (result.status === 'success' && result.data && result.data.posts) {
          // Extract initial like and save states from API data
          const initialLikedPosts = {};
          const initialSavedPosts = {};
          
          result.data.posts.forEach(post => {
            initialLikedPosts[post.id] = post.has_liked || false;
            initialSavedPosts[post.id] = post.has_saved || false;
          });
          
          // Update like and save states
          if (page === 1) {
            setLikedPosts(initialLikedPosts);
            setSavedPosts(initialSavedPosts);
          } else {
            setLikedPosts(prev => ({ ...prev, ...initialLikedPosts }));
            setSavedPosts(prev => ({ ...prev, ...initialSavedPosts }));
          }
          
          // If it's the first page, replace posts, otherwise append
          if (page === 1) {
            setPosts(result.data.posts);
          } else {
            setPosts(prevPosts => [...prevPosts, ...result.data.posts]);
          }
          
          // Check if there are more posts to load
          setHasMore(result.data.posts.length > 0 && result.data.pagination.has_next);
        } else {
          console.error('Unexpected API response format:', result);
          setError('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching posts feed:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [page]); // Re-fetch when page changes
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${API_URL}${ENDPOINTS.ME}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          }
        });
        const result = await response.json();
        if (result.status === 'success') {
          setUserInfo(result.data);
          console.log(result.data.profile_picture);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    const currentObserver = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );
    
    observer.current = currentObserver;
    
    const currentElement = lastPostElementRef.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [hasMore, isLoading, posts]);
  
  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const drawer = document.getElementById("drawer");
      if (drawer && !drawer.contains(event.target) && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

  const menuItems = [
    { icon: profile8, label: "Profilim", onClick: () => navigate('/profile') },
    { icon: profile1, label: "To'lovlar" },
    { icon: profile2, label: "Kontaktlar" },
    { icon: profile3, label: "Sozlamalar", onClick: () => navigate('/settings') },
    { icon: profile4, label: "Tarmoqdan foydalanish" },
    { icon: profile5, label: "Yordam 24/7" },
    { icon: profile6, label: "Tungi rejim" },
    { icon: profile7, label: "Dastur haqida" },
  ];
  
  // Stories state
  const [stories, setStories] = useState([]);
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [storiesError, setStoriesError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [activeUserStory, setActiveUserStory] = useState(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Function to handle caption expansion
  const toggleCaption = (postId) => {
    setExpandedCaptions(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };
  
  // Function to navigate to next media item in carousel
  const nextMedia = (postId) => {
    setActiveMediaIndices(prev => {
      const post = posts.find(p => p.id === postId);
      const totalMedia = post ? [post.main_media, ...post.additional_media].length : 1;
      const currentIndex = prev[postId] || 0;
      return {
        ...prev,
        [postId]: (currentIndex + 1) % totalMedia
      };
    });
  };
  
  // Function to navigate to previous media item in carousel
  const prevMedia = (postId) => {
    setActiveMediaIndices(prev => {
      const post = posts.find(p => p.id === postId);
      const totalMedia = post ? [post.main_media, ...post.additional_media].length : 1;
      const currentIndex = prev[postId] || 0;
      return {
        ...prev,
        [postId]: (currentIndex - 1 + totalMedia) % totalMedia
      };
    });
  };

  // Touch handlers for swipe functionality
  
  // Touch handlers for swipe functionality
  const handleTouchStart = (e, postId) => {
    setTouchStart({
      ...touchStart,
      [postId]: { x: e.touches[0].clientX, y: e.touches[0].clientY }
    });
  };
  
  const handleTouchMove = (e, postId) => {
    if (!touchStart[postId]) return;
    
    setTouchEnd({
      ...touchEnd,
      [postId]: { x: e.touches[0].clientX, y: e.touches[0].clientY }
    });
  };
  
  const handleTouchEnd = (postId) => {
    if (!touchStart[postId] || !touchEnd[postId]) return;
    
    const xDiff = touchStart[postId].x - touchEnd[postId].x;
    const yDiff = touchStart[postId].y - touchEnd[postId].y;
    
    // Only register as a swipe if the horizontal movement is greater than vertical
    // and greater than a minimum threshold (30px)
    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 30) {
      if (xDiff > 0) {
        // Swipe left, go to next
        nextMedia(postId);
      } else {
        // Swipe right, go to previous
        prevMedia(postId);
      }
    }
    
    // Reset touch states
    const newTouchStart = {...touchStart};
    const newTouchEnd = {...touchEnd};
    delete newTouchStart[postId];
    delete newTouchEnd[postId];
    setTouchStart(newTouchStart);
    setTouchEnd(newTouchEnd);
  };
  
  // Mouse handlers for drag functionality
  const handleMouseDown = (e, postId) => {
    setTouchStart({
      ...touchStart,
      [postId]: { x: e.clientX, y: e.clientY }
    });
  };
  
  const handleMouseMove = (e, postId) => {
    if (!touchStart[postId]) return;
    
    setTouchEnd({
      ...touchEnd,
      [postId]: { x: e.clientX, y: e.clientY }
    });
  };
  
  const handleMouseUp = (postId) => {
    handleTouchEnd(postId);
  };
  
  const handleMouseLeave = (postId) => {
    if (touchStart[postId]) {
      handleTouchEnd(postId);
    }
  };
  
  // Handle post likes
  const handleLike = async (postId) => {
    try {
      // Store the previous state to revert if needed
      const previousState = likedPosts[postId];
      
      // Optimistically update UI
      setLikedPosts(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));
      
      // Update the post's like count in the UI
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes_count: previousState ? post.likes_count - 1 : post.likes_count + 1
          };
        }
        return post;
      }));
      
      // Call API to like/unlike post
      const response = await likePost(postId);
      
      // If API call fails, revert the UI change
      if (response.status !== 'success') {
        // Revert like state
        setLikedPosts(prev => ({
          ...prev,
          [postId]: previousState
        }));
        
        // Revert like count
        setPosts(prev => prev.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes_count: previousState ? post.likes_count + 1 : post.likes_count - 1
            };
          }
          return post;
        }));
        
        console.error('Error liking post:', response.message);
      } else {
        // console.log('Post like status updated:', response.data);
      }
    } catch (error) {
      // Revert UI change on error
      setLikedPosts(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));
      console.error('Error liking post:', error);
    }
  };

  // Handle post saves
  const handleSave = async (postId) => {
    try {
      // Store the previous state to revert if needed
      const previousState = savedPosts[postId];
      
      // Optimistically update UI
      setSavedPosts(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));
      
      // Call API to save/unsave post
      const response = await savePost(postId);
      
      // If API call fails, revert the UI change
      if (response.status !== 'success') {
        // Revert save state
        setSavedPosts(prev => ({
          ...prev,
          [postId]: previousState
        }));
        console.error('Error saving post:', response.message);
      } else {
        // console.log('Post save status updated:', response.data);
      }
    } catch (error) {
      // Revert UI change on error
      setSavedPosts(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));
      console.error('Error saving post:', error);
    }
  };

  // Handle comments
  const handleComment = async (postId) => {
    try {
      setActiveCommentPost(postId);
      setShowComments(true);
      
      // Always fetch fresh comments when opening the comment drawer
      try {
        const response = await getComments(postId);
        if (response.status === 'success') {
          setComments(prev => ({
            ...prev,
            [postId]: response.data.comments || []
          }));
          // console.log('Comments retrieved:', response.data);
        } else {
          console.error('Error fetching comments:', response.message);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    } catch (error) {
      console.error('Error handling comment action:', error);
    }
  };
  
  // Handle comment submission
  const handleCommentSubmit = async (postId) => {
    if (!commentText.trim()) return;
    
    try {
      const response = await addComment(postId, commentText);
      // console.log('Comment submission response:', response);
      
      if (response.status === 'success') {
        // Create a new comment object based on the API response
        const newComment = {
          id: response.data.comment_id,
          text: response.data.text,
          user: response.data.user,
          created_at: response.data.created_at,
          is_own_comment: true
        };
        
        // Add the new comment to the top of the comments list
        setComments(prev => ({
          ...prev,
          [postId]: [
            newComment,
            ...(prev[postId] || [])
          ]
        }));
        
        // Clear the comment input
        setCommentText('');
      } else {
        console.error('Error adding comment:', response.message);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  
  // Comment drawer touch handlers
  const handleCommentTouchStart = (e) => {
    setCommentTouchStart(e.touches[0].clientY);
    setCommentTouchCurrent(e.touches[0].clientY);
  };

  const handleCommentTouchMove = (e) => {
    setCommentTouchCurrent(e.touches[0].clientY);
    const diff = e.touches[0].clientY - commentTouchStart;
    
    // Only allow swiping down
    if (diff > 0) {
      setIsSwipingComment(true);
      const commentContainer = e.currentTarget;
      commentContainer.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleCommentTouchEnd = (e) => {
    const diff = commentTouchCurrent - commentTouchStart;
    const commentContainer = e.currentTarget;
    
    // If swiped down more than 100px, close the drawer
    if (diff > 100) {
      setIsClosingComment(true);
      // Wait for animation to complete before hiding
      setTimeout(() => {
        setShowComments(false);
        setActiveCommentPost(null);
        setIsClosingComment(false);
        commentContainer.style.transform = '';
      }, 300);
    } else {
      // Reset position
      commentContainer.style.transform = '';
    }
    
    setIsSwipingComment(false);
  };

  // Close comments drawer
  const handleCloseComments = () => {
    setIsClosingComment(true);
    setTimeout(() => {
      setShowComments(false);
      setActiveCommentPost(null);
      setIsClosingComment(false);
    }, 300);
  };

  // Handle comment deletion
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await deleteComment(commentId);
      
      if (response.status === 'success') {
        // Remove the deleted comment from all posts
        setComments(prev => {
          const newComments = {};
          
          // For each post, filter out the deleted comment
          Object.keys(prev).forEach(postId => {
            newComments[postId] = prev[postId].filter(comment => comment.id !== commentId);
          });
          
          return newComments;
        });
      } else {
        console.error('Error deleting comment:', response.message);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Handle share
  const handleShare = (postId) => {
    // Share functionality would typically open a share dialog
    alert(`Share post ${postId}`);
  };
  
  // Handle story click
  const handleStoryClick = async (userStory) => {
    if (!userStory) return;
    
    setActiveUserStory(userStory);
    setActiveStoryIndex(0);
    setShowStory(true);
    setStoryProgress(0);
    setIsPaused(false);
    
    // Mark story as viewed in the UI
    if (userStory.stories && userStory.stories.length > 0) {
      try {
        const response = await viewStory(userStory.stories[0].id);
        // console.log('View story response:', response);
        
        // Update the stories state to reflect the viewed status
        setStories(prevStories => {
          return prevStories.map(story => {
            if (story.user_id === userStory.user_id) {
              return {
                ...story,
                stories: story.stories.map((s, index) => {
                  if (index === 0) {
                    return { ...s, viewed: true };
                  }
                  return s;
                })
              };
            }
            return story;
          });
        });
        
        // Update story count for unviewed stories
        setStoryCount(prev => Math.max(0, prev - 1));
      } catch (error) {
        console.error('Error viewing story:', error);
      }
    }
  };
  
  // Handle next story
  const handleNextStory = async () => {
    if (!activeUserStory || !activeUserStory.stories || isVideoLoading) return;
    
    const currentStories = activeUserStory.stories;
    
    if (activeStoryIndex < currentStories.length - 1) {
      // Move to next story in the same user's stories
      setActiveStoryIndex(prevIndex => prevIndex + 1);
      setStoryProgress(0);
      setIsMediaLoaded(false);
      setIsMediaLoading(true);
      
      // Call the viewStory API for the next story
      try {
        const response = await viewStory(currentStories[activeStoryIndex + 1].id);
        // console.log('View next story response:', response);
        
        // Mark this story as viewed in the UI
        setStories(prevStories => {
          return prevStories.map(story => {
            if (story.user_id === activeUserStory.user_id) {
              return {
                ...story,
                stories: story.stories.map((s, index) => {
                  if (index === activeStoryIndex + 1) {
                    return { ...s, viewed: true };
                  }
                  return s;
                })
              };
            }
            return story;
          });
        });
      } catch (error) {
        console.error('Error viewing next story:', error);
      }
    } else {
      // Move to the next user's stories if available
      const currentUserIndex = stories.findIndex(s => s.user_id === activeUserStory.user_id);
      
      if (currentUserIndex < stories.length - 1) {
        const nextUserStory = stories[currentUserIndex + 1];
        handleStoryClick(nextUserStory);
      } else {
        // No more stories, close the viewer
        handleCloseStory();
      }
    }
  };
  
  // Handle previous story
  const handlePrevStory = async () => {
    if (!activeUserStory || !activeUserStory.stories || isVideoLoading) return;
    
    if (activeStoryIndex > 0) {
      // Move to previous story in the same user's stories
      setActiveStoryIndex(prevIndex => prevIndex - 1);
      setStoryProgress(0);
      setIsMediaLoaded(false);
      setIsMediaLoading(true);
    } else {
      // Move to the previous user's stories if available
      const currentUserIndex = stories.findIndex(s => s.user_id === activeUserStory.user_id);
      
      if (currentUserIndex > 0) {
        const prevUserStory = stories[currentUserIndex - 1];
        setActiveUserStory(prevUserStory);
        setActiveStoryIndex(prevUserStory.stories.length - 1);
        setStoryProgress(0);
        setIsMediaLoaded(false);
        setIsMediaLoading(true);
      }
    }
  };

  // Close story
  const handleCloseStory = () => {
    setShowStory(false);
    setActiveUserStory(null);
    setActiveStoryIndex(0);
    setStoryProgress(0);
    setIsMediaLoaded(false);
    setIsMediaLoading(false);
    setIsVideoLoading(false);
  };

  // State to track media loading
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  // Handle media load event
  const handleMediaLoaded = () => {
    setIsMediaLoaded(true);
    setIsMediaLoading(false);
    setIsVideoLoading(false);
  };

  // Reset media loaded state when story changes
  useEffect(() => {
    setIsMediaLoaded(false);
    setIsMediaLoading(true);
    setIsVideoLoading(true);
  }, [activeUserStory, activeStoryIndex]);
  
  // Handle story progress and auto-advance
  useEffect(() => {
    if (!showStory || !activeUserStory || isPaused || !isMediaLoaded) return;
    
    // Determine story duration based on media type
    const currentStory = activeUserStory.stories[activeStoryIndex];
    const isVideo = currentStory && currentStory.media_type === 'video';
    const storyDuration = isVideo ? 30000 : 5000; // 30 seconds for video, 5 seconds for images
    
    const interval = 50; // Update progress every 50ms
    const increment = (interval / storyDuration) * 100;
    
    const timer = setInterval(() => {
      setStoryProgress(prev => {
        if (prev >= 100) {
          // Move to next story when progress reaches 100%
          handleNextStory();
          return 0;
        }
        return prev + increment;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [showStory, activeUserStory, activeStoryIndex, isPaused, isMediaLoaded]);

  return (
    <div className="app-container">
      {/* {showSettings && <Settings onClose={() => setShowSettings(false)} />} */}
      {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
      {showPostCreate && <CreatePost onClose={() => setShowPostCreate(false)} />}
      
      {/* Full Screen Story Viewer */}
      {showStory && activeUserStory && activeUserStory.stories && activeUserStory.stories.length > 0 && (
        <div 
          className="story-viewer"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Progress bars */}
          <div className="story-progress-container">
            {activeUserStory.stories.map((_, index) => (
              <div key={index} className="story-progress-bar-container">
                <div 
                  className={`story-progress-bar ${index < activeStoryIndex ? 'completed' : index === activeStoryIndex ? 'active' : ''}`}
                  style={index === activeStoryIndex ? { width: `${storyProgress}%` } : {}}
                ></div>
              </div>
            ))}
          </div>

          {/* Story header */}
          <div className="story-header">
            <div className="story-user-info">
              <div className="story-user-avatar">
                <img 
                  src={getSafeImageUrl(activeUserStory.profile_picture, 'https://api.istan.uz/', instaImg || Default)} 
                  onError={handleImageError} 
                  alt={activeUserStory.name} 
                />
              </div>
              <div className="story-info">
                <div className="story-username">{activeUserStory.name}</div>
                <div className="story-time">
                  {activeUserStory.stories[activeStoryIndex] && 
                    new Date(activeUserStory.stories[activeStoryIndex].created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
            <button className="story-close-btn" onClick={handleCloseStory}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Story content */}
          <div className="story-content">
            {isMediaLoading && (
              <div className="story-loading">
                <div className="loading-spinner"></div>
              </div>
            )}
            
            {activeUserStory.stories[activeStoryIndex] && (
              activeUserStory.stories[activeStoryIndex].media_type === 'video' ? (
                <video 
                  key={`story-video-${activeStoryIndex}`}
                  src={`https://api.istan.uz/${activeUserStory.stories[activeStoryIndex].media_url}`} 
                  className="story-media"
                  autoPlay
                  playsInline
                  controls
                  onLoadStart={() => {
                    setIsVideoLoading(true);
                    setIsMediaLoading(true);
                    setIsMediaLoaded(false);
                  }}
                  onLoadedData={() => {
                    setIsVideoLoading(false);
                    setIsMediaLoading(false);
                    setIsMediaLoaded(true);
                    // Start playing with sound
                    const video = document.querySelector('.story-media');
                    if (video) {
                      video.volume = 1.0;
                      video.play();
                    }
                  }}
                  onError={() => {
                    console.error('Error loading video');
                    setIsMediaLoading(false);
                    setIsMediaLoaded(true);
                    setIsVideoLoading(false);
                  }}
                />
              ) : (
                <img 
                  src={`https://api.istan.uz/${activeUserStory.stories[activeStoryIndex].media_url}`} 
                  alt="Story content" 
                  className="story-media"
                  onLoad={handleMediaLoaded}
                  onError={() => {
                    console.error('Error loading image');
                    setIsMediaLoading(false);
                    setIsMediaLoaded(true); // Force progress to continue even if media fails
                  }}
                />
              )
            )}

            {/* Navigation controls - without tap highlight */}
            <div className="story-navigation">
              <div className="story-nav-prev" onClick={handlePrevStory}></div>
              <div className="story-nav-next" onClick={handleNextStory}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Comments Drawer */}
      {showComments && activeCommentPost && (
        <div 
          className="comments-modal"
          onClick={(e) => {
            // Close if clicking the backdrop (not the container)
            if (e.target.className === 'comments-modal') {
              handleCloseComments();
            }
          }}
        >
          <div 
            className={`comments-container ${isSwipingComment ? 'swiping' : ''} ${isClosingComment ? 'closing' : ''}`}
            onTouchStart={handleCommentTouchStart}
            onTouchMove={handleCommentTouchMove}
            onTouchEnd={handleCommentTouchEnd}
          >
            <div className="comments-handle"></div>
            <div className="comments-header">
              <h3>Comments</h3>
              <button className="comments-close-btn" onClick={handleCloseComments}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="comments-list">
              {comments[activeCommentPost] && comments[activeCommentPost].length > 0 ? (
                comments[activeCommentPost].map((comment, index) => (
                  <div key={comment.id || index} className="comment-item">
                    <div className="comment-avatar">
                      <img 
                        src={getSafeImageUrl(comment.user?.profile_picture, API_URL2, instaImg || Default)}
                        onError={handleImageError} 
                        alt={comment.user?.username || 'User'} 
                        className="comment-avatar-img" 
                      />
                    </div>
                    <div className="comment-content">
                      <div className="comment-username">{comment.user?.username || 'User'}</div>
                      <div className="comment-text">{comment.text}</div>
                      <div className="comment-time">
                        {new Date(comment.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                      {comment.is_own_comment && (
                        <button className="comment-delete-btn" onClick={() => handleDeleteComment(comment.id)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-comments">No comments yet. Be the first to comment!</div>
              )}
            </div>
            
            <div className="comment-input-container">
              <input
                type="text"
                className="comment-input"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(activeCommentPost)}
              />
              <button 
                className="comment-submit-btn"
                onClick={() => handleCommentSubmit(activeCommentPost)}
                disabled={!commentText.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Drawer Backdrop */}
      {isDrawerOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        id="drawer"
        className={`drawer ${isDrawerOpen ? 'drawer-open' : 'drawer-closed'}`}
      >
        {/* Profile Section */}
        <div className="drawer-profile">
          <button
            className="drawer-close-btn"
            onClick={() => setIsDrawerOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Profile Info */}
          <div className="profile-info">
            <div className="profile-header">
              <div className="profile-avatar-container">
                <div className="profile-avatar" style={{ width: "84px", height: "84px" }}>
                  <img 
                    src={getSafeImageUrl(userData?.profile_picture, 'https://api.istan.uz/')} 
                    alt="Profile" 
                    className="avatar-img" 
                    onError={handleImageError}
                  />
                </div>
                <div className="profile-badge">
                  <span className="badge-text">{Array.isArray(userData?.profession) ? userData.profession[0] : (userData?.profession || 'Dasturchi')}</span>
                  <span className="badge-star">★</span>
                  <span className="badge-rating">{userData?.rating || '5.5'}</span>
                </div>
              </div>

              <div className="profile-details">
                {/* Name and Verification */}
                <div className="profile-name-container">
                  <h3 className="profile-name">{userData?.name || 'Loading...'}</h3>
                  {userData?.is_verified && (
                    <svg className="verification-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Phone Number */}
                <p className="profile-phone">{userData?.phone || 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-divider"></div>

        {/* Menu Items */}
        
        <div className="drawer-menu">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="menu-item"
              onClick={item.onClick}
            >
              <div className="menu-icon">
                <img src={item.icon || Default} onError={handleImageError} alt={item.label} className="menu-icon-img" />
              </div>
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </div>
        
        {/* Version Info */}
        <div className="version-info">
          <p className="version-text">
            Istan superapp android uchun<br />
            versiya 0.1 - a15.amd64
          </p>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="top-nav">
        <div className="nav-container">
          <div className="nav-content">
            {/* Left side - Menu and Profile */}
            <div className="nav-left">
              <button className="menu-button" onClick={() => setIsDrawerOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="stories-preview">
                <div className="stories-avatars">
                  {stories.slice(0, 3).map((userStoryItem) => (
                    <div
                      key={userStoryItem.user_id} 
                      className="story-avatar"
                      onClick={() => handleStoryClick(userStoryItem)}
                    >
                      <img
                        src={getSafeImageUrl(userStoryItem.profile_picture, 'https://api.istan.uz/')}
                        alt={userStoryItem.name || 'Story User'}
                        className="story-img"
                        onError={handleImageError}
                      />
                    </div>
                  ))}
                </div>
                {storyCount > 0 && (
                  <span className="stories-count">{`${storyCount} Hikayolar`}</span>
                )}
              </div>
            </div>

            {/* Right side - Icons */}
            <div className="nav-right">
              <button className="nav-icon-button">
                <img src={arxiv || Default} alt="arxiv" className="nav-icon" onError={handleImageError} />
              </button>
              <button className="nav-icon-button" onClick={() => setShowNotifications(true)}>
                <img src={notfikation || Default} alt="notfikation" className="nav-icon" onError={handleImageError} />
                <div className="notification-badge">
                  <span className="badge-count">1</span>
                </div>
              </button>
              <button className="nav-icon-button" onClick={() => navigate('/messenger')}>
                <img src={message || Default} alt="message" className="nav-icon" onError={handleImageError} />
                <div className="notification-badge">
                  <span className="badge-count">1</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="main-content">

        
        {/* Stories Section - Horizontal row below navbar, only shows when clicked */}
        {showStoryRow && (
          <div className="stories-row">
            <div className="stories-container">
              {/* Your Story */}
              <div className="story-item" onClick={() => handleStoryClick(stories.find(s => s.is_own || (s.stories && s.stories.some(story => story.is_own))))}>  
                <div className="story-circle">
                  <img 
                    src={getSafeImageUrl(userInfo?.profile_picture, API_URL2)} 
                    alt="Your Story" 
                    onError={handleImageError}
                  />
                </div>
                <span className="story-username">Your story</span>
              </div>
              
              {/* Other users' stories */}
              {stories.filter(userStory => !userStory.is_own && (!userStory.stories || !userStory.stories.some(story => story.is_own))).map((userStory, index) => {
                // Check if user has any unviewed stories
                const hasUnviewedStories = userStory.stories && userStory.stories.some(story => !story.viewed);
                // Determine border color based on viewed status
                const borderClass = hasUnviewedStories 
                  ? index % 3 === 0 ? 'pink-border' : index % 3 === 1 ? 'yellow-border' : 'blue-border'
                  : '';
                  
                return (
                  <div 
                    key={userStory.user_id} 
                    className="story-item"
                    onClick={() => handleStoryClick(userStory)}
                  >
                    <div className={`story-circle ${borderClass}`}>
                      <img 
                        src={API_URL2 + userStory.profile_picture || 
                             (index % 4 === 0 ? profile1 : 
                              index % 4 === 1 ? profile2 : 
                              index % 4 === 2 ? profile3 : profile4) || 
                             API_URL2 + userStory.profile_picture || Default} 
                        alt={userStory.name || userStory.username || `User ${index + 1}`} 
                      />
                    </div>
                    <span className="story-username">{ userStory.name || `User ${index + 1}`}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Posts content */}
        <div className="posts-container">
          {/* Error message */}
          {error && (
            <div className="error-message">
              <p>Error: {error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  setPage(1);
                }}
                style={{ padding: '8px 16px', marginTop: '10px', cursor: 'pointer' }}
              >
                Try Again
              </button>
            </div>
          )}

        {/* Posts from API */}
        {posts.length > 0 ? (
          posts.map((post, index) => {
            // Check if this is the last item
            const isLastItem = index === posts.length - 1;
            
            return (
              <div 
                key={post.id}
                className="post"
                style={{ animation: `fadeIn 0.3s ease forwards ${index * 0.1}s` }}
                ref={isLastItem ? lastPostElementRef : null}
              >
              <div className="post-header">
                <div className="post-avatar">
                  <img 
                    src={getSafeImageUrl(post.user.profile_picture, API_URL2)} 
                    alt={post.user.name} 
                    className="avatar-img"
                    onError={handleImageError}
                  />
                </div>
                <div className="post-user-info">
                  <div className="user-name-container">
                    <div className="user-name">{post.user.name}</div>
                    {post.is_own_post && (
                      <div className="verification-badge">
                        <svg className="verification-icon-small" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  {post.location_name && (
                    <div className="user-location">{post.location_name}</div>
                  )}
                </div>
                <button className="post-menu-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon-small" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>

              <div className="post-image">
                {/* Combine main media and additional media for carousel */}
                {(() => {
                  const allMedia = [post.main_media, ...post.additional_media];
                  const currentIndex = activeMediaIndices[post.id] || 0;
                  const currentMedia = allMedia[currentIndex];
                  
                  return (
                    <div className="carousel-container">
                      {/* Media display with touch/swipe handlers */}
                      <div 
                        className="media-container"
                        onTouchStart={(e) => handleTouchStart(e, post.id)}
                        onTouchMove={(e) => handleTouchMove(e, post.id)}
                        onTouchEnd={() => handleTouchEnd(post.id)}
                        onMouseDown={(e) => handleMouseDown(e, post.id)}
                        onMouseMove={(e) => handleMouseMove(e, post.id)}
                        onMouseUp={() => handleMouseUp(post.id)}
                        onMouseLeave={() => handleMouseLeave(post.id)}
                      >
                        {currentMedia.media_type === 'image' ? (
                          <img 
                            src={currentMedia.file_url.startsWith('http') 
                              ? currentMedia.file_url 
                              : `https://${API_HOST}${currentMedia.file_url}`} 
                            alt="Post content" 
                            className="post-img" 
                            loading="lazy"
                            onError={handleImageError}
                            draggable="false"
                          />
                        ) : (
                          <video 
                            src={currentMedia.file_url.startsWith('http') 
                              ? currentMedia.file_url 
                              : `https://${API_HOST}${currentMedia.file_url}`} 
                            controls 
                            className="post-video"
                            preload="metadata"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.poster = Default;
                            }}
                          />
                        )}
                      </div>
                      
                      {/* Only show dots indicator if there are multiple media items */}
                      {allMedia.length > 1 && (
                        <div className="carousel-indicators">
                          {allMedia.map((_, index) => (
                            <span 
                              key={index}
                              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMediaIndices(prev => ({
                                  ...prev,
                                  [post.id]: index
                                }));
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <div className="post-actions">
                <div className="action-buttons" style={{ paddingLeft: '0px' }}>
                  <div className="action-buttons-left">
                    <button 
                      className={`action-button ${likedPosts[post.id] ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      {likedPosts[post.id] ? (
                        <svg aria-label="Unlike" className="action-icon" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24">
                          <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                      ) : (
                        <svg aria-label="Like" className="action-icon" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="black" strokeWidth="2"></path>
                        </svg>
                      )}
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => handleComment(post.id)}
                    >
                      <svg aria-label="Comment" className="action-icon" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => handleShare(post.id)}
                    >
                      <svg aria-label="Share post" className="action-icon" fill="#000" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <path d="M22 3 9.218 10.083M11.698 20.334 22 3.001 2 3.001 9.218 10.084l2.48 10.25z" fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                    </button>
                  </div>
                  <button 
                    className={`action-button ${savedPosts[post.id] ? 'saved' : ''}`}
                    onClick={() => handleSave(post.id)}
                    style={{ marginLeft: 'auto', marginRight: '8px' }}
                  >
                    {savedPosts[post.id] ? (
                      <svg aria-label="Remove" className="action-icon" fill="#000000" height="26" role="img" viewBox="0 0 24 24" width="26">
                        <polygon fill="#000000" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="none"></polygon>
                      </svg>
                    ) : (
                      <svg aria-label="Save" className="action-icon" fill="none" height="26" role="img" viewBox="0 0 24 24" width="26">
                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                      </svg>
                    )}
                  </button>
                </div>

                <div className="likes-container">
                  {post.likes_count > 0 && (
                    <div className="likes-avatars">
                      <div className="like-avatar">
                        <img src={instaImg || Default} alt="Liker" className="like-avatar-img" onError={handleImageError} />
                      </div>
                    </div>
                  )}
                  <div className="likes-text">
                    {post.likes_count > 0 ? (
                      <>
                        <span className="bold-text">{post.likes_count} {post.likes_count === 1 ? 'like' : 'likes'}</span>
                      </>
                    ) : (
                      <>Be the first to like this</>  
                    )}
                  </div>
                </div>
                
                {/* Comments count */}
                {post.comments_count > 0 && (
                  <div className="comments-count" onClick={() => handleComment(post.id)}>
                    View all {post.comments_count} {post.comments_count === 1 ? 'comment' : 'comments'}
                  </div>
                )}

                {post.caption && (
                  <div className="post-caption">
                    <span className="bold-text">{post.user.name}</span>{' '}
                    {expandedCaptions[post.id] || post.caption.length <= 100 ? (
                      <span>{post.caption}</span>
                    ) : (
                      <>
                        <span>{post.caption.substring(0, 100)}...</span>
                        <button 
                          className="more-button"
                          onClick={() => setExpandedCaptions({...expandedCaptions, [post.id]: true})}
                        >
                          more
                        </button>
                      </>
                    )}
                  </div>
                )}

                <div className="post-date">
                  {new Date(post.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              
              {/* We don't need this anymore since we have a carousel */}
            </div>
          );
        }))
        : (!isLoading && (
          <div className="no-posts-message">
            <p>No posts available. Follow users to see their posts here.</p>
          </div>
        ))}

        {/* Loading skeletons */}
        {isLoading && (
          <>
            {[1, 2, 3].map((_, index) => (
              <div 
                key={`skeleton-${index}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="post skeleton-post">
                  <div className="post-header">
                    <div className="skeleton-avatar"></div>
                    <div className="post-user-info">
                      <div className="skeleton-text skeleton-username"></div>
                      <div className="skeleton-text skeleton-location"></div>
                    </div>
                    <div className="skeleton-icon right-icon"></div>
                  </div>
                  <div className="skeleton-image"></div>
                  <div className="post-actions">
                    <div className="action-buttons">
                      <div className="skeleton-icon"></div>
                      <div className="skeleton-icon"></div>
                      <div className="skeleton-icon"></div>
                      <div className="skeleton-icon right-icon"></div>
                    </div>
                    <div className="skeleton-text skeleton-caption-line"></div>
                    <div className="skeleton-text skeleton-caption-line short"></div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        
        {/* Loading more indicator */}
        {isLoading && posts.length > 0 && (
          <div className="loading-text">Loading more posts...</div>
        )}
        
        {/* No more posts indicator */}
        {!isLoading && !hasMore && posts.length > 0 && (
          <div className="loading-text">No more posts to load</div>
        )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="bottom-nav-container">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'home' ? 'active-tab' : ''}`} 
              onClick={() => setActiveTab('home')}
            >
              <img src={home || Default} alt="Home" className="tab-icon" onError={handleImageError} />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'search' ? 'active-tab' : ''}`} 
              onClick={() => setActiveTab('search')}
            >
              <img src={search || Default} alt="Search" className="tab-icon" onError={handleImageError} />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'addContent' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('addContent');
                setShowPostCreate(true);
              }}
            >
              <img src={addContent || Default} alt="Add Content" className="tab-icon" onError={handleImageError} />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'email' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('email');
                navigate('/email');
              }}
            >
              <img src={email || Default} alt="Email" className="tab-icon" onError={handleImageError} />
            </button>
            <button 
              className={`nav-tab ${activeTab === 'apps' ? 'active-tab' : ''}`} 
              onClick={() => {
                setActiveTab('apps');
                navigate('/more-apps');
              }}
            >
              <img src={apps || Default} alt="Apps" className="tab-icon" onError={handleImageError} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
