import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

const getToken = () => sessionStorage.getItem("token") ?? localStorage.getItem("token");

axiosConfig.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosConfig;
