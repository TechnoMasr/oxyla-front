import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ إنشاء instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Interceptor للطلبات
api.interceptors.request.use(
  (config) => {
    // ✅ إضافة التوكن لو موجود
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const lang = localStorage.getItem("lang") || "en";
    config.headers.lang = lang;

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
