/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/DashboardStats";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";

import {
    getBooks,
    deleteBook,
} from "@/services/bookService";

export default function DashboardPage() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    // -------------------------------
    // Load Books
    // -------------------------------

    const fetchBooks = async () => {

        try {

            setLoading(true);

            const res = await getBooks();

            setBooks(res.data.books);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch books"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchBooks();

    }, []);

    // -------------------------------
    // Delete Book
    // -------------------------------

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        try {

            const res = await deleteBook(id);

            toast.success(res.data.message);

            fetchBooks();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );

        }

    };

    // -------------------------------
    // Search & Filter
    // -------------------------------

    const filteredBooks = books.filter((book) => {

        const matchesSearch =
            book.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            book.author
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            status === "" ||
            book.status === status;

        return matchesSearch && matchesStatus;

    });

    return (

        <div className="min-h-screen bg-gray-100">

            {/* <Navbar /> */}

            <div className="mx-auto max-w-7xl p-6">

                <DashboardStats books={books} />

                <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div className="w-full md:w-96">

                        <SearchBar
                            value={search}
                            onChange={setSearch}
                        />

                    </div>

                    <div className="flex gap-3">

                        <FilterBar
                            status={status}
                            setStatus={setStatus}
                        />

                        <Link href="/books/add">
                            <Button className="w-auto">
                                + Add Book
                            </Button>
                        </Link>

                    </div>

                </div>

                <div className="mt-8">

                    {loading ? (

                        <Loader />

                    ) : filteredBooks.length === 0 ? (

                        <EmptyState />

                    ) : (

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {filteredBooks.map((book) => (

                                <BookCard
                                    key={book._id}
                                    book={book}
                                    onDelete={handleDelete}
                                />

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}