"use client";

import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function BookForm({
    initialData = {},
    onSubmit,
    loading = false,
}) {

    const [form, setForm] = useState({
        title: initialData.title || "",
        author: initialData.author || "",
        tags: initialData.tags
            ? initialData.tags.join(", ")
            : "",
        status: initialData.status || "Want to Read",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            ...form,
            title: form.title.trim(),
            author: form.author.trim(),
            tags: form.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
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
                required
            />

            <Input
                label="Author"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author name"
                required
            />

            <Input
                label="Tags"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Self Help, Productivity"
            />

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Status
                </label>

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
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

            <Button
                type="submit"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Book"}
            </Button>

        </form>
    );
}