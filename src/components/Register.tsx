import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from './icons/PersonIcon';
import TeacherIcon from './icons/TeacherIcon';
import BusinessIcon from './icons/BusinessIcon';



const Register = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [showProfessionModal, setShowProfessionModal] = useState(false);
  const [formData, setFormData] = useState({
    ism: '',
    familiya: '',
    username: '',
    kasbingiz: '',
    user_type: '2',
  });

  const [professions, setProfessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'https://api.istan.uz';

  const getProfessions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/api/v1/user/get-profession/`);
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const responseData = await response.json();
      
      if (responseData.status === 'success' && Array.isArray(responseData.data)) {
        setProfessions(responseData.data);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching professions:', error);
      setError('Kasblar ro\'yxatini olishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfessions();
  }, []);

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
    const userTypes = ['1', '2', '3'];
    setFormData(prev => ({
      ...prev,
      user_type: userTypes[tabIndex]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfessionSelect = (profession) => {
    setFormData(prev => ({
      ...prev,
      kasbingiz: profession.id.toString()
    }));
    setShowProfessionModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.ism || !formData.familiya || !formData.username || !formData.kasbingiz) {
      alert("Iltimos, barcha zaruriy maydonlarni to'ldiring");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/user/partial-create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: localStorage.getItem('phone'),
          username: formData.username,
          name: formData.ism,
          second_name: formData.familiya,
          profession: formData.kasbingiz,
          user_type: formData.user_type,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('access_token', data.data.access);
        localStorage.setItem('refresh_token', data.data.refresh);
        navigate('/main');
      } else {
        throw new Error('User partial create failed');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Ro\'yxatdan o\'tishda xatolik yuz berdi');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '50px 20px 30px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '40px',
          fontWeight: 'bold',
          color: '#009688',
          marginBottom: '20px',
          lineHeight: 1.2
        }}>
          Ro'yxatdan<br />o'tish sahifasi
        </h1>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Siz <span style={{ color: '#009688', fontWeight: 500 }}>{localStorage.getItem('phone') || '+998********'}</span> raqamidan ro'yxatdan o'tmoqdasiz. 
          <span style={{ 
            color: '#009688', 
            fontWeight: 500, 
            textDecoration: 'underline', 
            cursor: 'pointer', 
            marginLeft: '4px' 
          }}>O'zgartirish</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="Ism"
            value={formData.ism}
            onChange={(e) => handleInputChange('ism', e.target.value)}
            style={{
              width: '100%',
              height: '50px',
              border: '1px solid #E0E0E0',
              borderRadius: '4px',
              padding: '0 15px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#ffffff',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>

        <div style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="Familiya"
            value={formData.familiya}
            onChange={(e) => handleInputChange('familiya', e.target.value)}
            style={{
              width: '100%',
              height: '50px',
              border: '1px solid #E0E0E0',
              borderRadius: '4px',
              padding: '0 15px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#ffffff',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>

        <div style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            style={{
              width: '100%',
              height: '50px',
              border: '1px solid #E0E0E0',
              borderRadius: '4px',
              padding: '0 15px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#ffffff',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>

        <div style={{ margin: '8px 0' }}>
          <div style={{
            display: 'flex',
            width: '100%',
            height: '60px',
            border: '1px solid #E0E0E0',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <button
              type="button"
              onClick={() => handleTabPress(0)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: activeTab === 0 ? '#009688' : 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              <PersonIcon color={activeTab === 0 ? '#FFFFFF' : '#333333'} />
            </button>
            <button
              type="button"
              onClick={() => handleTabPress(1)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: activeTab === 1 ? '#009688' : 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              <TeacherIcon color={activeTab === 1 ? '#FFFFFF' : '#333333'} />
            </button>
            <button
              type="button"
              onClick={() => handleTabPress(2)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: activeTab === 2 ? '#009688' : 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              <BusinessIcon color={activeTab === 2 ? '#FFFFFF' : '#333333'} />
            </button>
          </div>
        </div>

        <div style={{ width: '100%' }}>
          <button
            type="button"
            onClick={() => setShowProfessionModal(true)}
            style={{
              width: '100%',
              height: '50px',
              border: '1px solid #E0E0E0',
              borderRadius: '4px',
              padding: '0 15px',
              fontSize: '16px',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <span style={{ color: formData.kasbingiz ? '#333' : '#BDBDBD' }}>
              {formData.kasbingiz ? 
                professions.find(p => p.id.toString() === formData.kasbingiz)?.name : 
                "Kasbingizni tanlang"}
            </span>
            <span style={{ fontSize: '12px', color: '#666' }}>▼</span>
          </button>
        </div>

        <button 
          type="submit" 
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#009688',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '14px',
            transition: 'background-color 0.2s'
          }}
        >
          Yuborish
        </button>
      </form>

      {showProfessionModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            width: '85%',
            maxWidth: '500px',
            maxHeight: '70vh',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '20px',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '15px',
              marginBottom: '15px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', margin: 0 }}>
                Kasbingizni tanlang
              </h3>
              <button 
                type="button"
                onClick={() => setShowProfessionModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  color: '#666',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                ✕
              </button>
            </div>
            
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                <p>Yuklanmoqda...</p>
              </div>
            ) : error ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                <p>{error}</p>
                <button 
                  type="button"
                  onClick={getProfessions}
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#009688',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Qayta urinish
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {professions.length === 0 ? (
                  <p style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                    Kasblar topilmadi
                  </p>
                ) : (
                  professions.map((profession) => (
                    <button
                      key={profession.id}
                      type="button"
                      onClick={() => handleProfessionSelect(profession)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px',
                        border: 'none',
                        background: 'none',
                        fontSize: '16px',
                        color: '#333',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f0f0f0',
                        ':hover': {
                          backgroundColor: '#f5f5f5'
                        }
                      }}
                    >
                      {profession.name}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;