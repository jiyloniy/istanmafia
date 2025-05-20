import { getTokens } from '../config/api';

export const isAuthenticated = () => {
    const { access } = getTokens();
    return !!access;
};

export const PUBLIC_ROUTES = ['/login', '/verify', '/register', '/', '/onboarding', '/onboarding2', '/onboarding3'];
export const DEFAULT_PRIVATE_ROUTE = '/home';
export const DEFAULT_PUBLIC_ROUTE = '/login'; 