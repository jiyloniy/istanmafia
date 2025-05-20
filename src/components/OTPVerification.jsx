import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import istanLogo from '../assets/logo2.png';
import { API, API_HEADERS, setTokens } from '../config/api';

const OTPVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const phone = location.state?.phone;

    useEffect(() => {
        if (!phone) {
            navigate('/login');
        }
    }, [phone, navigate]);

    // Countdown timer effect
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [countdown]);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        if (value !== '' && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs[index - 1].current.focus();
        }
    };

    const handleSubmit = async () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 4) {
            setError('Iltimos, to\'liq kodni kiriting');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(API.VERIFY_OTP, {
                method: 'POST',
                headers: API_HEADERS,
                body: JSON.stringify({
                    phone: phone,
                    code: otpValue
                })
            });

            const data = await response.json();

            if (data.status === 'success') {
                // Tokenlarni saqlash
                if (data.data.access && data.data.refresh) {
                    setTokens({
                        access: data.data.access,
                        refresh: data.data.refresh
                    });
                }
                
                // Store phone number in localStorage
                localStorage.setItem('phone', phone);
                
                if (data.data.is_new) {
                    // Yangi foydalanuvchi
                    navigate('/register');
                } else {
                    // Mavjud foydalanuvchi
                    navigate('/home');
                }
            } else {
                setError(data.message || 'Kod noto\'g\'ri. Qaytadan urinib ko\'ring');
                // Xato bo'lganda inputlarni tozalash
                setOtp(['', '', '', '']);
                inputRefs[0].current.focus();
            }
        } catch (error) {
            console.error('Verification error:', error);
            setError('Server bilan bog\'lanishda xatolik yuz berdi');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!phone || !canResend) return;

        setIsLoading(true);
        setError('');
        setCanResend(false);
        setCountdown(30);

        try {
            const response = await fetch(API.GENERATE_SMS, {
                method: 'POST',
                headers: API_HEADERS,
                body: JSON.stringify({
                    phone: phone
                })
            });

            const data = await response.json();

            if (data.status !== 'success') {
                setError(data.message || 'Kodni qayta yuborishda xatolik');
                setCanResend(true);
                setCountdown(0);
            }
        } catch (error) {
            console.error('Resend code error:', error);
            setError('Server bilan bog\'lanishda xatolik yuz berdi');
            setCanResend(true);
            setCountdown(0);
        } finally {
            setIsLoading(false);
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
                    fontSize: '22px',
                    fontFamily: 'Roboto',
                    width: '300px',
                }}>
                    Telefon raqamingizga yuborilgan kodni kiriting
                </p>
            </div>

            {/* OTP Input section */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginTop: '30px',
                justifyContent: 'center'
            }}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        disabled={isLoading}
                        style={{
                            width: '60px',
                            height: '60px',
                            border: '1px solid #E0E0E0',
                            borderRadius: '12px',
                            fontSize: '24px',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            color: '#333',
                            outline: 'none',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}
                    />
                ))}
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

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={isLoading || otp.join('').length !== 4}
                style={{
                    backgroundColor: '#008C8C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '22px',
                    fontFamily: 'Roboto',
                    cursor: isLoading || otp.join('').length !== 4 ? 'not-allowed' : 'pointer',
                    width: '100%',
                    maxWidth: '350px',
                    marginTop: '30px',
                    opacity: isLoading || otp.join('').length !== 4 ? 0.6 : 1
                }}
            >
                {isLoading ? 'Tekshirilmoqda...' : 'Tasdiqlash'}
            </button>

            {/* Resend code section */}
            <div style={{
                marginTop: '20px',
                textAlign: 'center',
                color: '#666',
                fontSize: '14px',
                fontFamily: 'Roboto'
            }}>
                {countdown > 0 ? (
                    <p style={{ color: '#666' }}>
                        Qayta yuborish uchun kutish vaqti: {countdown} soniya
                    </p>
                ) : (
                    <p 
                        onClick={handleResendCode}
                        style={{ 
                            color: '#008C8C', 
                            marginTop: '5px',
                            cursor: (isLoading || !canResend) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Kodni qayta yuborish
                    </p>
                )}
            </div>
        </div>
    );
};

export default OTPVerification; 