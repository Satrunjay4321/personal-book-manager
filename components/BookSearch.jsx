"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import {
    Search,
    BookOpen,
    CheckCircle2,
    User,
    FileText,
} from "lucide-react";

import Button from "./ui/Button";
import Input from "./ui/Input";

import { searchGoogleBooks } from "@/services/googleBookService";


export default function BookSearch({
    onSelect,
}) {

    const [query, setQuery] = useState("");

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(false);


    // --------------------------------
    // Search Books
    // --------------------------------

    const handleSearch = async (e) => {

        if (e) {
            e.preventDefault();
        }

        if (!query.trim()) {

            toast.error("Enter a book name.");

            return;

        }

        try {

            setLoading(true);

            const res = await searchGoogleBooks(
                query.trim()
            );

            setBooks(res.books || []);

            if (!res.books?.length) {

                toast("No books found. Try another search.");

            }

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to fetch books."
            );

        } finally {

            setLoading(false);

        }

    };


    // --------------------------------
    // Select Book
    // --------------------------------

    const handleSelect = (book) => {

        onSelect(book);

        // Clear search input
        setQuery("");

        // Clear results
        setBooks([]);

        toast.success(
            `"${book.title}" selected`
        );

    };


    return (

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">


            {/* Header */}

            <div className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white px-4 py-5 sm:px-6">

                <div className="flex items-start gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">

                        <Search size={21} />

                    </div>


                    <div>

                        <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">

                            Search Book Online

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            Find a book online and automatically fill
                            its details.

                        </p>

                    </div>

                </div>

            </div>


            {/* Search Area */}

            <div className="p-4 sm:p-6">

                <form
                    onSubmit={handleSearch}
                    className="flex flex-col gap-3 md:flex-row md:items-end"
                >

                    <div className="w-full md:flex-[4]">

                        <Input
                            placeholder="Search by book title..."
                            value={query}
                            onChange={(e) =>
                                setQuery(e.target.value)
                            }
                            className="py-3"
                        />

                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 whitespace-nowrap px-6 py-3 md:w-auto md:flex-1"
                    >

                        <Search size={18} />

                        {loading
                            ? "Searching..."
                            : "Search"
                        }

                    </Button>

                </form>


                <p className="mt-3 text-xs text-gray-400">
                    {'Try searching for books like "Atomic Habits", "Harry Potter", or "The Alchemist".'}
                </p>



                {/* Loading State */}

                {loading && (

                    <div className="mt-6 space-y-3">

                        {[1, 2, 3].map((item) => (

                            <div
                                key={item}
                                className="animate-pulse rounded-xl border border-gray-100 p-4"
                            >

                                <div className="flex gap-4">

                                    <div className="h-16 w-12 rounded-lg bg-gray-200" />

                                    <div className="flex-1 space-y-3">

                                        <div className="h-4 w-3/4 rounded bg-gray-200" />

                                        <div className="h-3 w-1/2 rounded bg-gray-100" />

                                        <div className="h-3 w-1/3 rounded bg-gray-100" />

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* Results */}

                {!loading && books.length > 0 && (

                    <div className="mt-7">


                        {/* Results Header */}

                        <div className="mb-4 flex items-center justify-between">

                            <div>

                                <h3 className="font-semibold text-gray-800">

                                    Search Results

                                </h3>

                                <p className="mt-1 text-sm text-gray-500">

                                    {books.length} book
                                    {books.length !== 1 ? "s" : ""} found

                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() => {

                                    setBooks([]);
                                    setQuery("");

                                }}
                                className="text-sm font-medium text-gray-400 transition hover:text-red-500"
                            >

                                Clear

                            </button>

                        </div>


                        {/* Book Results */}

                        <div className="space-y-3">

                            {books.map((book) => (

                                <div
                                    key={book.id}
                                    className="group rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-indigo-300 hover:shadow-md"
                                >

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">


                                        {/* Book Icon */}

                                        <div className="flex h-14 w-12 shrink-0 items-center justify-center self-start rounded-lg bg-indigo-50 text-indigo-600 sm:self-auto">

                                            <BookOpen size={24} />

                                        </div>


                                        {/* Book Details */}

                                        <div className="min-w-0 flex-1">

                                            <h3
                                                className="truncate text-base font-semibold text-gray-800 sm:text-lg"
                                                title={book.title}
                                            >

                                                {book.title}

                                            </h3>


                                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">


                                                {/* Author */}

                                                <div className="flex items-center gap-1.5">

                                                    <User size={14} />

                                                    <span className="max-w-[180px] truncate">

                                                        {book.author ||
                                                            "Unknown author"}

                                                    </span>

                                                </div>


                                                {/* Pages */}

                                                <div className="flex items-center gap-1.5">

                                                    <FileText size={14} />

                                                    <span>

                                                        {book.pageCount
                                                            ? `${book.pageCount} pages`
                                                            : "Pages unknown"}

                                                    </span>

                                                </div>

                                            </div>


                                            {/* Summary */}

                                            {book.summary && (

                                                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">

                                                    {book.summary}

                                                </p>

                                            )}

                                        </div>


                                        {/* Select Button */}

                                        <Button
                                            type="button"
                                            onClick={() =>
                                                handleSelect(book)
                                            }
                                            className="flex w-full items-center justify-center gap-2 sm:w-auto"
                                        >

                                            <CheckCircle2 size={17} />

                                            Select Book

                                        </Button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}