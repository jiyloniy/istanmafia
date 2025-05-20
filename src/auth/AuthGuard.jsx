import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, PUBLIC_ROUTES, DEFAULT_PRIVATE_ROUTE } from './authUtils';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const authenticated = isAuthenticated();
    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

    useEffect(() => {
        // Agar foydalanuvchi authenticated bo'lsa va public routega kirmoqchi bo'lsa
        if (authenticated && isPublicRoute) {
            navigate(DEFAULT_PRIVATE_ROUTE);
            return;
        }

        // Agar foydalanuvchi authenticated bo'lmasa va private routega kirmoqchi bo'lsa
        if (!authenticated && !isPublicRoute) {
            navigate(DEFAULT_PUBLIC_ROUTE);
            return;
        }
    }, [authenticated, isPublicRoute, navigate]);

    return children;
};

export default AuthGuard; 