"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import BookCard from "@/components/BookCard";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

import {
    getBooks,
    deleteBook,
} from "@/services/bookService";


export default function BooksPage() {

    const router = useRouter();

    // null = loading
    // [] = loaded but no books
    const [books, setBooks] = useState(null);

    // Stores the ID of the book currently being deleted
    const [deletingId, setDeletingId] = useState(null);

    // Custom delete confirmation
    const [bookToDelete, setBookToDelete] = useState(null);


    // --------------------------------
    // Load Books
    // --------------------------------

    useEffect(() => {

        let cancelled = false;

        getBooks()
            .then((res) => {

                if (!cancelled) {

                    setBooks(
                        res.data.books || []
                    );

                }

            })
            .catch((error) => {

                if (!cancelled) {

                    console.error(error);

                    toast.error(
                        error.response?.data?.message ||
                        "Failed to load books"
                    );

                    setBooks([]);

                }

            });

        return () => {
            cancelled = true;
        };

    }, []);


    // --------------------------------
    // Open Delete Confirmation
    // --------------------------------

    const handleDeleteClick = (id) => {

        setBookToDelete(id);

    };


    // --------------------------------
    // Delete Book
    // --------------------------------

    const handleDeleteConfirm = async () => {

        if (!bookToDelete) {
            return;
        }

        try {

            setDeletingId(bookToDelete);

            // Wait for animation
            await new Promise((resolve) =>
                setTimeout(resolve, 300)
            );

            const res = await deleteBook(bookToDelete);

            // Remove book from UI
            setBooks((current) =>
                current.filter(
                    (book) =>
                        book._id !== bookToDelete
                )
            );

            toast.success(
                res.data.message ||
                "Book deleted successfully"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete book"
            );

            // Restore animation state if deletion fails
            setDeletingId(null);

        } finally {

            setBookToDelete(null);

        }

    };


    // --------------------------------
    // Loading
    // --------------------------------

    if (books === null) {

        return <Loader />;

    }


    return (

        <div className="min-h-screen bg-gray-100">

            <div className="mx-auto max-w-7xl p-6">


                {/* Header */}

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">

                            My Books

                        </h1>

                        <p className="mt-1 text-gray-500">

                            Manage and track your reading collection.

                        </p>

                    </div>


                    <Button
                        onClick={() =>
                            router.push("/books/add")
                        }
                    >

                        + Add Book

                    </Button>

                </div>


                {/* Empty State */}

                {books.length === 0 ? (

                    <div className="rounded-xl border bg-white py-16 text-center shadow-sm">

                        <h2 className="text-xl font-semibold text-gray-700">

                            Your library is empty

                        </h2>

                        <p className="mt-2 text-gray-500">

                            Start building your personal book collection.

                        </p>

                        <Button
                            className="mt-6"
                            onClick={() =>
                                router.push("/books/add")
                            }
                        >

                            Add Your First Book

                        </Button>

                    </div>

                ) : (


                    /* Books Grid */

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {books.map((book) => (

                            <div
                                key={book._id}
                                className={`transition-all duration-300 ease-in-out ${
                                    deletingId === book._id
                                        ? "scale-95 opacity-0"
                                        : "scale-100 opacity-100"
                                }`}
                            >

                                <BookCard
                                    book={book}
                                    onDelete={
                                        handleDeleteClick
                                    }
                                />

                            </div>

                        ))}

                    </div>

                )}


                {/* Delete Confirmation Modal */}

                {bookToDelete && (

                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

                        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">


                            {/* Icon */}

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-7 w-7 text-red-600"
                                >

                                    <path d="M3 6h18" />

                                    <path d="M8 6V4h8v2" />

                                    <path d="M19 6l-1 14H6L5 6" />

                                    <path d="M10 11v5" />

                                    <path d="M14 11v5" />

                                </svg>

                            </div>


                            {/* Text */}

                            <div className="mt-4 text-center">

                                <h2 className="text-xl font-semibold text-gray-800">

                                    Delete Book?

                                </h2>

                                <p className="mt-2 text-sm text-gray-500">

                                    This book will be permanently removed
                                    from your library. This action cannot
                                    be undone.

                                </p>

                            </div>


                            {/* Buttons */}

                            <div className="mt-6 flex justify-center gap-3">

                                <Button
                                    variant="secondary"
                                    disabled={deletingId !== null}
                                    onClick={() =>
                                        setBookToDelete(null)
                                    }
                                >

                                    Cancel

                                </Button>


                                <Button
                                    variant="danger"
                                    disabled={deletingId !== null}
                                    onClick={handleDeleteConfirm}
                                >

                                    {deletingId
                                        ? "Deleting..."
                                        : "Delete Book"
                                    }

                                </Button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}