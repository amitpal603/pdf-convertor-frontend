import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAccessToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get('/auth/me');
                if (res.data.success) {
                    setUser(res.data.user);
                }
            } catch (err) {
                // Not logged in or token expired
                // If refresh-token also fail in api.js interceptor, it will come here.
                setUser(null);
                setAccessToken(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.success) {
                // Based on user's recent update, backend now returns accessToken in login.
                if (res.data.accessToken) {
                    setAccessToken(res.data.accessToken);
                }
                setUser(res.data.user);
                return res.data;
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed';
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post('/auth/register', data);
            if (res.data.success) {
                // After signup, we usually redirect to login, but if 
                // the backend returns a user/token, we handle it here.
                return res.data;
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Registration failed';
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
            setAccessToken(null);
        } catch (err) {
            console.error('Logout error:', err);
            // Even if logout fails, we clear state on client
            setUser(null);
            setAccessToken(null);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        signup,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
