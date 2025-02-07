import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:1000/api', // ✅ Use correct backend base URL
});

export const googleAuth = (code) => api.post(`/auth/googlelogin`, { code });
