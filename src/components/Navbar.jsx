import React from 'react';
import { useLocation } from 'react-router-dom';
import home from "../assets/home.png";
import search from "../assets/search.png";
import addContent from "../assets/add-content.png";
import notfikation from "../assets/notfikation.png";
import message from "../assets/message.png";
import Default from "../assets/default.png";

const Navbar = ({ onCreatePost, onNotification, currentUser }) => {
  const location = useLocation();
  
  // Navbarni ko'rsatish kerak bo'lgan routelar
  const showNavbarRoutes = [ ];
  
  // Agar joriy route navbarni ko'rsatish kerak bo'lgan routelar ichida bo'lmasa, navbar ko'rsatilmaydi
  if (!showNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="top-menu">
      <div className="menu-left">
        <div className="menu-item active">
          <img src={home} alt="Home" />
        </div>
        <div className="menu-item">
          <img src={search} alt="Search" />
        </div>
        <div className="menu-item" onClick={onCreatePost}>
          <img src={addContent} alt="Add content" />
        </div>
      </div>
      <div className="menu-right">
        <div className="menu-item" onClick={onNotification}>
          <img src={notfikation} alt="Notifications" />
        </div>
        <div className="menu-item">
          <img src={message} alt="Messages" />
        </div>
        <div className="menu-item profile">
          <img 
            src={currentUser?.avatar || Default} 
            alt="Profile" 
            onError={(e) => { e.target.src = Default }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
