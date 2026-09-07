/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import ProgressModal from "@/components/ProgressModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import DashboardStats from "@/components/DashboardStats";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";

import {
    getBooks,
    updateBook,
    deleteBook,
} from "@/services/bookService";

export default function DashboardPage() {

    const router = useRouter();

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [bookToDelete, setBookToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [progressBook, setProgressBook] = useState(null);
    const [progressLoading, setProgressLoading] = useState(false);

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

    // const handleDelete = async (id) => {

    //     const confirmDelete = window.confirm(
    //         "Are you sure you want to delete this book?"
    //     );

    //     if (!confirmDelete) {
    //         return;
    //     }

    //     try {

    //         const res = await deleteBook(id);

    //         toast.success(res.data.message);

    //         fetchBooks();

    //     } catch (error) {

    //         toast.error(
    //             error.response?.data?.message ||
    //             "Delete failed"
    //         );

    //     }

    // };

    const handleDelete = (book) => {
        setBookToDelete(book);
    };

    const handleConfirmDelete = async () => {

        if (!bookToDelete) {
            return;
        }

        try {

            setDeleteLoading(true);

            const res = await deleteBook(
                bookToDelete._id
            );

            toast.success(res.data.message);

            setBooks((current) =>
                current.filter(
                    (book) => book._id !== bookToDelete._id
                )
            );

            setBookToDelete(null);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );

        } finally {

            setDeleteLoading(false);

        }

    };

    // -------------------------------
    // Update Reading Progress
    // -------------------------------

    const handleProgressSave = async (pagesRead) => {

        if (!progressBook) {
            return;
        }

        try {

            setProgressLoading(true);

            const totalPages =
                Number(progressBook.pageCount) || 0;

            const updatedData = {

                title: progressBook.title,

                author: progressBook.author,

                summary: progressBook.summary || "",

                pageCount: totalPages,

                pagesRead: Number(pagesRead),

                status:
                    Number(pagesRead) >= totalPages
                        ? "Completed"
                        : "Reading",
            };

            await updateBook(
                progressBook._id,
                updatedData
            );

            toast.success("Progress updated");

            setProgressBook(null);

            await fetchBooks();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update progress"
            );

        } finally {

            setProgressLoading(false);

        }

    };

    // -------------------------------
    // Search & Filter
    // -------------------------------

    const filteredBooks = books.filter((book) => {

        const title =
            book.title?.toLowerCase() || "";

        const author =
            book.author?.toLowerCase() || "";

        const searchText =
            search.toLowerCase();

        const matchesSearch =
            title.includes(searchText) ||
            author.includes(searchText);

        const matchesStatus =
            status === "" ||
            book.status === status;

        return matchesSearch && matchesStatus;

    });

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="mx-auto max-w-7xl p-6">

                {/* Dashboard Statistics */}

                <DashboardStats books={books} />

                {/* Search + Filter + Add */}

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

                {/* Books */}

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
                                    onEdit={() => {
                                        router.push(`/books/${book._id}/edit`);
                                    }}
                                    onProgress={(book) => {
                                        setProgressBook(book);
                                    }}
                                    onDelete={() => {
                                        handleDelete(book);
                                    }}
                                />

                            ))}

                        </div>

                    )}

                </div>

            </div>

            {/* Progress Modal */}

            <ProgressModal
                book={progressBook}
                loading={progressLoading}
                onClose={() => {
                    setProgressBook(null);
                }}
                onSave={handleProgressSave}
            />
            <ConfirmModal
                open={Boolean(bookToDelete)}
                title="Delete Book"
                message={
                    bookToDelete
                        ? `Are you sure you want to permanently delete "${bookToDelete.title}" from your library?`
                        : ""
                }
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={() => setBookToDelete(null)}
                loading={deleteLoading}
            />

        </div>

    );

}