import axios from "axios";

const axiosConfig = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1",

    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

axiosConfig.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token") ?? localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosConfig;