import axios from "axios";

const API = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export const getBooks = () =>
    API.get("/books");

export const getBook = (id) =>
    API.get(`/books/${id}`);

export const addBook = (data) =>
    API.post("/books", data);

export const updateBook = (id, data) =>
    API.put(`/books/${id}`, data);

export const deleteBook = (id) =>
    API.delete(`/books/${id}`);