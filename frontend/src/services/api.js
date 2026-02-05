import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base
});


// ================= REQUEST INTERCEPTOR =================
// Automatically attach token to EVERY request
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token"); // ⭐ important fix

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ================= RESPONSE INTERCEPTOR (optional but pro) =================
// If token expired → auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
