// API URL configuration
// Use environment variable if available, otherwise use the hardcoded default
export const API_HOST = process.env.REACT_APP_API_HOST || 'api.istan.uz';
export const API_PORT = process.env.REACT_APP_API_PORT || '2004';
export const API_URL = `https://api.istan.uz/api/v1/`;
export const API_URL2 = `https://api.istan.uz/`;
// API endpoints
export const ENDPOINTS = {
  PROFILE_COMPACT: 'user/profile/compact/',
  PROFILE_UPDATE: 'user/profile/update/',
  MEDIA_FILTERED_POSTS: 'user/posts/media-filter/',
  MEDIA_FILTERED_POSTS_IMAGES: 'user/posts/media-filter/?media_type=image',
  MEDIA_FILTERED_POSTS_VIDEOS: 'user/posts/media-filter/?media_type=video',
  MEDIA_FILTERED_POSTS_MEDIA: 'user/posts/user/',
    GENERATE_SMS: 'user/sms/generate/',
    VERIFY_OTP: 'user/sms/verify/',
    POST: 'user/post/create/',
    STORY: 'user/story/create/',
    POST_FEED: 'user/posts/feed/',
    ME: 'user/me/',
    // Story endpoints
    STORY_FEED: 'user/story/feed/',
    VIEW_STORY: 'user/story/view/:storyId/',
    // Post interaction endpoints
    POST_LIKE: 'user/posts/:postId/like/',
    POST_COMMENT: 'user/posts/:postId/comment/',
    GET_COMMENTS: 'user/posts/:postId/comments/',
    DELETE_COMMENT: 'user/comments/:commentId/',
    POST_SAVE: 'user/posts/:postId/save/',
    GET_SAVED_POSTS: 'user/posts/saved/'
};

// Full API paths
export const API = {
    GENERATE_SMS: API_URL + ENDPOINTS.GENERATE_SMS,
    VERIFY_OTP: API_URL + ENDPOINTS.VERIFY_OTP,
    POST: API_URL + ENDPOINTS.POST,
    STORY: API_URL + ENDPOINTS.STORY,
    POST_FEED: API_URL + ENDPOINTS.POST_FEED,
    ME: API_URL + ENDPOINTS.ME,
    // Story endpoints
    STORY_FEED: API_URL + ENDPOINTS.STORY_FEED,
    VIEW_STORY: API_URL + ENDPOINTS.VIEW_STORY,
    // Post interaction endpoints
    POST_LIKE: API_URL + ENDPOINTS.POST_LIKE,
    POST_COMMENT: API_URL + ENDPOINTS.POST_COMMENT,
    GET_COMMENTS: API_URL + ENDPOINTS.GET_COMMENTS,
    DELETE_COMMENT: API_URL + ENDPOINTS.DELETE_COMMENT,
    POST_SAVE: API_URL + ENDPOINTS.POST_SAVE,
    GET_SAVED_POSTS: API_URL + ENDPOINTS.GET_SAVED_POSTS
};

// application/json
export const API_HEADERS = {
    'Content-Type': 'application/json'
};

// multipart/form-data
export const API_HEADERS_MULTIPART = {
    'Content-Type': 'multipart/form-data'
};

// application/x-www-form-urlencoded
export const API_HEADERS_URL_ENCODED = {
    'Content-Type': 'application/x-www-form-urlencoded'
}; 

// Token utilities
export const setTokens = (tokens) => {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
};

export const getTokens = () => {
    return {
        access: localStorage.getItem('access_token'),
        refresh: localStorage.getItem('refresh_token')
    };
};

export const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

// Helper function to get authorization headers
export const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
        ...API_HEADERS,
        'Authorization': `Bearer ${token}`
    };
};

// Helper functions for URL parameter replacement

// Replace postId in URL
const replacePostId = (url, postId) => {
    return url.replace(':postId', postId);
};

// Replace commentId in URL
const replaceCommentId = (url, commentId) => {
    return url.replace(':commentId', commentId);
};

// Replace storyId in URL
const replaceStoryId = (url, storyId) => {
    return url.replace(':storyId', storyId);
};

// Like/Unlike a post
export const likePost = async (postId) => {
    try {
        const response = await fetch(replacePostId(API.POST_LIKE, postId), {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return await response.json();
    } catch (error) {
        console.error('Error liking post:', error);
        throw error;
    }
};

// Add a comment to a post
export const addComment = async (postId, text) => {
    try {
        const response = await fetch(replacePostId(API.POST_COMMENT, postId), {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ text })
        });
        return await response.json();
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

// Get comments for a post
export const getComments = async (postId, page = 1) => {
    try {
        const response = await fetch(`${replacePostId(API.GET_COMMENTS, postId)}?page=${page}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        return await response.json();
    } catch (error) {
        console.error('Error getting comments:', error);
        throw error;
    }
};

// Delete a comment
export const deleteComment = async (commentId) => {
    try {
        const response = await fetch(replaceCommentId(API.DELETE_COMMENT, commentId), {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

// Save/Unsave a post
export const savePost = async (postId) => {
    try {
        const response = await fetch(replacePostId(API.POST_SAVE, postId), {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return await response.json();
    } catch (error) {
        console.error('Error saving post:', error);
        throw error;
    }
};

// Get saved posts
export const getSavedPosts = async () => {
    try {
        const response = await fetch(API.GET_SAVED_POSTS, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        return await response.json();
    } catch (error) {
        console.error('Error getting saved posts:', error);
        throw error;
    }
};

// Get user data
export const getMe = async () => {
    try {
        const response = await fetch(API.ME, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        return await response.json();
    } catch (error) {
        console.error('Error getting user data:', error);
        throw error;
    }
};

// Story API functions

// Get story feed
export const getStoryFeed = async () => {
    try {
        const response = await fetch(API.STORY_FEED, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching story feed:', error);
        throw error;
    }
};

// View a story
export const viewStory = async (storyId) => {
    try {
        const response = await fetch(replaceStoryId(API.VIEW_STORY, storyId), {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return await response.json();
    } catch (error) {
        console.error('Error viewing story:', error);
        throw error;
    }
};

export default API;