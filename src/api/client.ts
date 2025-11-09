import axios from "axios";

// baseURL ของ backend (ใช้ .env)
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Interceptor — เพิ่ม token ก่อนยิง request
// รอ phase ต่อไป
// apiClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export default apiClient;
