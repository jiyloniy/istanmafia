import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Kirish = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      backgroundColor: '#008C8C',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <img 
        src={logo}
        alt="ISTAN Logo"
        style={{
          width: '250px',
          height: 'auto',
          marginBottom: '15px'
        }}
      />
    
      <p style={{
        color: 'white',
        fontSize: '1rem',
        textAlign: 'center'
      }}>
        Yagona platformada cheksiz imkoniyatlar
      </p>
    </div>
  );
};

export default Kirish;
