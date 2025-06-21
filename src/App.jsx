import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Kirish from './components/Kirish';
import Home from './components/Home';
import Onboarding from './components/Onboarding';
import Messenger from './components/Messenger';
import ClubView from './components/ClubView';
import Onboarding2 from './components/Onboarding2';
import Onboarding3 from './components/Onboarding3';
import Login from './components/Login';
import OTPVerification from './components/OTPVerification';
import Register from './components/Register.tsx';
import { isAuthenticated } from './auth/authUtils';
import Email from './components/Email';

import Profile from './components/Profile';
import Settings from './components/Settings';
import CreatePost from './components/CreatePost.jsx';
import MoreApps from './components/MoreApps';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';
import ArchivePage from './archive/ArchivePage';

// Public route wrapper
const PublicRoute = ({ children }) => {
  const auth = isAuthenticated();
  
  if (auth) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
};

// Private route wrapper
const PrivateRoute = ({ children }) => {
  const auth = isAuthenticated();
  
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PublicRoute>
            <Kirish />
          </PublicRoute>
        } />
        
        <Route path="/onboarding" element={
          <PublicRoute>
            <Onboarding />
          </PublicRoute>
        } />
        
        <Route path="/onboarding2" element={
          <PublicRoute>
            <Onboarding2 />
          </PublicRoute>
        } />
        
        <Route path="/onboarding3" element={
          <PublicRoute>
            <Onboarding3 />
          </PublicRoute>
        } />
        
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        
        <Route path="/verify" element={
          <PublicRoute>
            <OTPVerification />
          </PublicRoute>
        } />

        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Private Routes */}
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />


        <Route path="/settings" element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />

        <Route path="/email" element={
          <PrivateRoute>
            <Email />
          </PrivateRoute>
        } />

        <Route path="/messenger" element={
          <PrivateRoute>
            <Messenger />
          </PrivateRoute>
        } />
        
        <Route path="/createPost" element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        } />

        <Route path="/more-apps" element={
          <PrivateRoute>
            <MoreApps />
          </PrivateRoute>
        } />

        <Route path="/portifel" element={
          <PrivateRoute>
            <Portfolio />
          </PrivateRoute>
        } />

        <Route path="/resume" element={
          <PrivateRoute>
            <Resume />
          </PrivateRoute>
        } />

        {/* Archive Standalone Auth & Page */}
        <Route path="/archive" element={
          <PrivateRoute>
            <ArchivePage />
          </PrivateRoute>
        } />

        {/* ClubView route */}
        <Route path="/clubs/:id" element={
          <PrivateRoute>
            <ClubView />
          </PrivateRoute>
        } />

        {/* Catch all route - redirect to login or home based on auth status */}
        <Route path="*" element={
          isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;
