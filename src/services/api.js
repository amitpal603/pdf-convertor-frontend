import axios from 'axios';

let accessToken = localStorage.getItem('accessToken') || null;

const api = axios.create({
    baseURL: "https://pdf-convertor-2-gv7l.onrender.com/api" || 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAccessToken = (token) => {
    accessToken = token;
    if (token) {
        localStorage.setItem('accessToken', token);
    } else {
        localStorage.removeItem('accessToken');
    }
};

// Request interceptor to add the bearer token
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for automatic token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call refresh token endpoint
                const res = await axios.post(
                    `${api.defaults.baseURL}/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                if (res.data.success) {
                    // Refresh token logic in backend sets new cookies AND we should get new accessToken
                    // If backend doesn't return accessToken in refresh, it's fine since it's in cookie
                    // and middleware prefers cookie if present.
                    // But if backend returns it, we should update it.
                    if (res.data.accessToken) {
                        setAccessToken(res.data.accessToken);
                    }
                    
                    return api(originalRequest); // Retry original request
                }
            } catch (refreshError) {
                // Refresh failed, probably refresh token expired too
                setAccessToken(null);
                // We can't use useAuth here, but the 401 will propagate to the UI
                // which should handle redirecting to login.
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
