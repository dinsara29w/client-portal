import axios from 'axios';

const api = axios.create({
    baseURL: 'https://client-portal-0dzi.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach the auth token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
