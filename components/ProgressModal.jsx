"use client";

import { useState } from "react";
import Button from "./ui/Button";

export default function ProgressModal({
    book,
    onClose,
    onSave,
    loading = false,
}) {

    if (!book) {
        return null;
    }

    return (
        <ProgressForm
            key={book._id}
            book={book}
            onClose={onClose}
            onSave={onSave}
            loading={loading}
        />
    );
}

function ProgressForm({
    book,
    onClose,
    onSave,
    loading = false,
}) {

    const [pagesRead, setPagesRead] = useState(
        Number(book.pagesRead) || 0
    );

    const totalPages =
        Number(book.pageCount) || 0;

    const handleSubmit = (e) => {

        e.preventDefault();

        const value = Number(pagesRead);

        if (value < 0) {
            return;
        }

        if (value > totalPages) {
            return;
        }

        onSave(value);
    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                {/* Header */}

                <div className="mb-6">

                    <h2 className="text-xl font-semibold text-gray-900">
                        Update Reading Progress
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {book.title}
                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label
                            htmlFor="pagesRead"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Pages Read
                        </label>

                        <input
                            id="pagesRead"
                            type="number"
                            min="0"
                            max={totalPages}
                            value={pagesRead}
                            onChange={(e) =>
                                setPagesRead(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />

                        <p className="mt-1 text-xs text-gray-500">
                            Total pages: {totalPages}
                        </p>

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-3">

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Save Progress"}
                        </Button>

                    </div>

                </form>

            </div>

        </div>
    );
}