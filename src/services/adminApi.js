import axios from 'axios';

const API_BASE_URL = 'https://safiox-server.onrender.com/api/admin';

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('safiox_admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Handle auth errors (e.g., clear token and redirect)
            localStorage.removeItem('safiox_admin_token');
            window.location.href = '/admin?login=true';
        }
        return Promise.reject(error.response?.data || error.message);
    }
);

export const AdminAPI = {
    getAnalytics: () => api.get('/analytics'),
    getUsers: (params = '') => api.get(`/users?${params}`),
    deactivateUser: (id) => api.put(`/users/${id}/deactivate`),
    reactivateUser: (id) => api.put(`/users/${id}/reactivate`),
    getOrganizations: (query = '') => api.get(`/organizations${query ? '?' + query : ''}`),
    approveOrg: (id) => api.put(`/organizations/${id}/approve`),
    rejectOrg: (id, reason) => api.put(`/organizations/${id}/reject`, { reason }),
    getPosts: (params = '') => api.get(`/posts?${params}`),
    removePost: (id, reason) => api.put(`/posts/${id}/remove`, { reason }),
    restorePost: (id) => api.put(`/posts/${id}/restore`),
    getActiveSOS: () => api.get('/sos/active'),
    resolveSOS: (id) => api.put(`/sos/${id}/resolve`),
    getIncidents: (params = '') => api.get(`/incidents?${params}`),
    getResponders: (params = '') => api.get(`/community/responders?${params}`),
    verifyResponder: (id, verified) => api.put(`/community/responders/${id}/verify`, { verified }),
    sendBroadcast: (data) => api.post('/broadcast', data),

    login: (email, password) => axios.post('https://safiox-server.onrender.com/api/auth/login', { email, password }).then(res => res.data)
};
