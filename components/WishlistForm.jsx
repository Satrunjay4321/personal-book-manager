"use client";

import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function WishlistForm({
    onSubmit,
    loading = false,
}) {

    const [form, setForm] = useState({
        title: "",
        author: "",
        summary: "",
        pageCount: "",
    });


    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({
            ...form,
            pageCount: Number(form.pageCount),
        });

    };


    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <Input
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Book title"
            />


            <Input
                label="Author"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author name"
            />


            <div>

                <label className="mb-2 block text-sm font-medium">
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


            <Input
                label="Total Pages"
                type="number"
                name="pageCount"
                value={form.pageCount}
                onChange={handleChange}
                min="1"
                placeholder="320"
            />


            <Button
                type="submit"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add to Wishlist"}
            </Button>

        </form>

    );
}