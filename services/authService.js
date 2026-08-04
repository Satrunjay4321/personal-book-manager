import axios from "axios";

const API = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export const signup = (data) =>
    API.post("/auth/signup", data);

export const login = (data) =>
    API.post("/auth/login", data);

export const logout = () =>
    API.post("/auth/logout");

export const getCurrentUser = () =>
    API.get("/auth/me");