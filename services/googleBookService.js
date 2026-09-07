import axios from "axios";

const API = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export const searchGoogleBooks = async (query) => {

    const response = await API.get(
        `/google-books?q=${encodeURIComponent(query)}`
    );

    return response.data;

};