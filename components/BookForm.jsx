/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

import BookSearch from "./BookSearch";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function BookForm({
    initialData = {},
    onSubmit,
    onAddToWishlist,
    loading = false,
    wishlistLoading = false,
    showOnlineSearch = true,
    showWishlistButton = true,
}) {

    const [form, setForm] = useState({
        title: initialData.title || "",
        author: initialData.author || "",
        summary: initialData.summary || "",
        pageCount: initialData.pageCount || "",
        pagesRead: initialData.pagesRead || 0,
        status: initialData.status || "Want to Read",
    });


    // --------------------------------
    // Load existing book when editing
    // --------------------------------

    useEffect(() => {

        if (Object.keys(initialData).length > 0) {

            setForm({
                title: initialData.title || "",
                author: initialData.author || "",
                summary: initialData.summary || "",
                pageCount: initialData.pageCount || "",
                pagesRead: initialData.pagesRead || 0,
                status: initialData.status || "Want to Read",
            });

        }

    }, [initialData]);


    // --------------------------------
    // Handle Form Changes
    // --------------------------------

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // --------------------------------
    // Select Google Book
    // --------------------------------

    const handleBookSelect = (book) => {

        setForm((prev) => ({
            ...prev,
            title: book.title,
            author: book.author,
            summary: book.summary || "",
            pageCount: book.pageCount || "",
            pagesRead: 0,
            status: "Want to Read",
        }));

    };


    // --------------------------------
    // Prepare Form Data
    // --------------------------------

    const getFormData = () => {

        return {
            ...form,
            pageCount: Number(form.pageCount),
            pagesRead: Number(form.pagesRead),
        };

    };


    // --------------------------------
    // Save Book
    // --------------------------------

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(getFormData());

    };


    // --------------------------------
    // Add To Wishlist
    // --------------------------------

    const handleAddToWishlist = () => {

        if (!onAddToWishlist) {
            return;
        }

        onAddToWishlist(getFormData());

    };


    return (

        <div className="space-y-8">

            {/* Online Search */}

            {showOnlineSearch && (

                <BookSearch
                    onSelect={handleBookSelect}
                />

            )}


            {/* Book Form */}

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-xl border bg-white p-6 shadow"
            >

                {/* Title */}

                <Input
                    label="Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Book title"
                />


                {/* Author */}

                <Input
                    label="Author"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author name"
                />


                {/* Description */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Description
                    </label>

                    <textarea
                        rows={5}
                        name="summary"
                        value={form.summary}
                        onChange={handleChange}
                        placeholder="Book description"
                        className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
                    />

                </div>


                {/* Page Count */}

                <Input
                    label="Total Pages"
                    type="number"
                    name="pageCount"
                    value={form.pageCount}
                    onChange={handleChange}
                    min="1"
                    placeholder="eg. 320"
                />


                {/* Status */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Status
                    </label>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900"
                    >

                        <option value="Want to Read">
                            Want to Read
                        </option>

                        <option value="Reading">
                            Reading
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                    </select>

                </div>


                {/* Pages Read */}

                {form.status === "Reading" && (

                    <Input
                        label="Pages Read"
                        type="number"
                        name="pagesRead"
                        value={form.pagesRead}
                        onChange={handleChange}
                        min="0"
                        max={form.pageCount || undefined}
                        placeholder="0"
                    />

                )}


                {/* Actions */}

                <div className="flex flex-col gap-3 pt-3 sm:flex-row">

                    {/* Save */}

                    <Button
                        type="submit"
                        disabled={loading || wishlistLoading}
                        className="flex-1 cursor-pointer"
                    >
                        {loading
                            ? "Saving..."
                            : "Save Book"
                        }
                    </Button>


                    {/* Wishlist */}

                    {showWishlistButton && (
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={loading || wishlistLoading || !onAddToWishlist}
                            onClick={handleAddToWishlist}
                            className="flex-1 cursor-pointer"
                        >
                            {wishlistLoading
                                ? "Adding..."
                                : "♡ Add to Wishlist"
                            }
                        </Button>
                    )}

                </div>

            </form>

        </div>

    );

}