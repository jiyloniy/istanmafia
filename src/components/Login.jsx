import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import istanLogo from '../assets/logo2.png';
import uzFlag from '../assets/uzb.png';
import ruFlag from '../assets/rus.png';
import { API, API_HEADERS } from '../config/api';

const Login = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({
        flag: uzFlag,
        code: '+998',
        placeholder: '901234567',
        requiredLength: 9
    });
    // phone state

    
    const countries = [
        { 
            flag: uzFlag, 
            code: '+998',
            placeholder: '901234567',
            requiredLength: 9
        },
        { 
            flag: ruFlag, 
            code: '+7',
            placeholder: '9991234567',
            requiredLength: 10
        }
    ];

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Faqat raqamlarni qoldirish
        if (value.length <= selectedCountry.requiredLength) {
            setPhoneNumber(value);
            setError('');
        }
    };

    const validatePhone = () => {
        if (phoneNumber.length !== selectedCountry.requiredLength) {
            const message = selectedCountry.code === '+998' 
                ? 'Uzbekiston raqami 9 ta raqamdan iborat bo\'lishi kerak'
                : 'Rossiya raqami 10 ta raqamdan iborat bo\'lishi kerak';
            setError(message);
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (isTermsAccepted && validatePhone()) {
            setIsLoading(true);
            setError('');
            
            const fullPhoneNumber = selectedCountry.code + phoneNumber;
            
            try {
                const response = await fetch(API.GENERATE_SMS, {
                    method: 'POST',
                    headers: API_HEADERS,
                    body: JSON.stringify({
                        phone: fullPhoneNumber
                    })
                });

                const data = await response.json();

                if (data.status === 'success') {
                    navigate('/verify', { 
                        state: { 
                            phone: fullPhoneNumber 
                        } 
                    });
                } else {
                    setError(data.message || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring');
                }
            } catch (error) {
                console.error('API error:', error);
                setError('Server bilan bog\'lanishda xatolik yuz berdi');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            alignItems: 'center',
            gap: '20px'
        }}>
            {/* Logo section */}
            <div style={{
                marginTop: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
            }}>
                <img
                    src={istanLogo}
                    alt="Istan Logo"
                    style={{
                        width: '250px',
                        height: 'auto'
                    }}
                />
                <p style={{
                    color: '#008C8C',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontFamily: 'Roboto',
                    maxWidth: '300px'
                }}>
                    Iltimos, mamlakat kodingizni tanlang{'\n'}
                    va telefon raqamingizni kiriting.
                </p>
            </div>

            {/* Phone input section */}
            <div style={{
                width: '100%',
                maxWidth: '350px',
                marginTop: '30px',
                position: 'relative'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #E0E0E0',
                    borderRadius: '50px',
                    padding: '15px 20px',
                    marginBottom: '20px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}>
                    <div 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginRight: '15px',
                            cursor: 'pointer',
                            borderRight: '1px solid #E0E0E0',
                            paddingRight: '15px',
                            position: 'relative'
                        }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div>
                            <img
                                src={selectedCountry.flag}
                                alt="Country flag"
                                style={{
                                    width: '35px',
                                    height: '25px'
                                }}
                            />
                        </div>
                        <svg 
                            width="10" 
                            height="6" 
                            viewBox="0 0 10 6" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                marginTop: '2px',
                                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                            }}
                        >
                            <path 
                                d="M1 1L5 5L9 1" 
                                stroke="#666666" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>

                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: '0',
                                marginTop: '10px',
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                padding: '8px',
                                zIndex: 10,
                                minWidth: '120px'
                            }}>
                                {countries.map((country, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '8px',
                                            cursor: 'pointer',
                                            borderRadius: '8px',
                                            transition: 'background-color 0.2s ease',
                                            ':hover': {
                                                backgroundColor: '#f5f5f5'
                                            }
                                        }}
                                        onClick={() => {
                                            setSelectedCountry(country);
                                            setIsDropdownOpen(false);
                                            setPhoneNumber(''); // Mamlakat o'zgarganda raqamni tozalash
                                            setError(''); // Xatoni tozalash
                                        }}
                                    >
                                        <img
                                            src={country.flag}
                                            alt="Country flag"
                                            style={{
                                                width: '35px',
                                                height: '25px'
                                            }}
                                        />
                                        <span style={{
                                            color: '#666',
                                            fontSize: '14px'
                                        }}>
                                            {country.code}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <input
                        type="tel"
                        placeholder={selectedCountry.placeholder}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        disabled={isLoading}
                        style={{
                            border: 'none',
                            outline: 'none',
                            fontSize: '16px',
                            width: '100%',
                            fontFamily: 'Roboto',
                            color: '#333',
                            backgroundColor: 'transparent'
                        }}
                    />
                </div>
                {error && (
                    <p style={{
                        color: 'red',
                        fontSize: '14px',
                        marginTop: '5px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </p>
                )}
            </div>

            {/* Buttons section */}
            <div style={{
                width: '100%',
                maxWidth: '350px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <button 
                    style={{
                        backgroundColor: '#008C8C',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        fontSize: '22px',
                        fontFamily: 'Roboto',
                        cursor: (isTermsAccepted && phoneNumber.length === selectedCountry.requiredLength && !isLoading) ? 'pointer' : 'not-allowed',
                        width: '100%',
                        opacity: (isTermsAccepted && phoneNumber.length === selectedCountry.requiredLength && !isLoading) ? 1 : 0.6
                    }}
                    disabled={!isTermsAccepted || phoneNumber.length !== selectedCountry.requiredLength || isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? 'Yuborilmoqda...' : 'Yuborish'}
                </button>
                <button 
                    style={{
                        backgroundColor: '#605CA8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        fontSize: '22px',
                        fontFamily: 'Roboto',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                    onClick={() => {
                        // OneID test muhitiga yo'naltirish
                        window.location.href = 'https://id.egov.uz/oz';
                    }}
                >
                    One ID orqali kirish
                </button>
            </div>

            {/* Terms and conditions */}
            <div 
                style={{
                    position: 'sticky', // Changed from fixed to sticky
                    bottom: '0', // Stick to the very bottom
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', // Center the content within the sticky bar
                    gap: '10px',
                    color: '#008C8C',
                    fontSize: '14px',
                    fontFamily: 'Roboto',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff', // Match page background
                    padding: '15px 20px', // Add some padding
                    width: '100%', // Take full width
                    boxSizing: 'border-box', // Include padding and border in the element's total width and height
                    borderTop: '1px solid #e0e0e0', // Optional: add a top border for visual separation
                    zIndex: 1 // Ensure it's above other scrollable content if necessary
                }}
                onClick={() => setIsTermsAccepted(!isTermsAccepted)}
            >
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="4" stroke="#008C8C" strokeWidth="2"/>
                    {isTermsAccepted && (
                        <path 
                            d="M7 12L10.5 15.5L17 9" 
                            stroke="#008C8C" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    )}
                </svg>
                <span style={{
                    color: '#008C8C',
                    fontSize: '16px',
                    fontWeight: '400',
                    width: '250px',
                    letterSpacing: '0.05em'
                }}>
                    Ilovadan foydalanish shartlariga rozlik bildiraman
                </span>
            </div>
        </div>
    );
};

export default Login; 