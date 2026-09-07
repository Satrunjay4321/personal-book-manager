"use client";

import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function BookCard({
    book,
    onEdit,
    onDelete,
    onProgress,
}) {
    const totalPages = Number(book.pageCount) || 0;
    const pagesRead = Number(book.pagesRead) || 0;

    const progress =
        totalPages > 0
            ? Math.min(
                Math.round((pagesRead / totalPages) * 100),
                100
            )
            : 0;

    return (
        <Card className="flex h-full flex-col gap-4">

            {/* Header */}

            <div className="flex min-h-[64px] items-start justify-between gap-3">

                <div className="min-w-0">

                    <h2
                        className="line-clamp-2 text-xl font-semibold text-gray-800"
                        title={book.title}
                    >
                        {book.title}
                    </h2>

                    <p
                        className="mt-1 truncate text-sm text-gray-500"
                        title={book.author}
                    >
                        {book.author}
                    </p>

                </div>

                <div className="shrink-0">
                    <Badge status={book.status} />
                </div>

            </div>

            {/* Description */}

            <div className="min-h-[48px]">

                {book.summary ? (

                    <p
                        className="line-clamp-3 text-sm leading-6 text-gray-600"
                        title={book.summary}
                    >
                        {book.summary}
                    </p>

                ) : (

                    <p className="text-sm italic text-gray-400">
                        No description available.
                    </p>

                )}

            </div>

            {/* Book Information */}

            <div className="rounded-lg bg-gray-50 px-4 py-3">

                <div className="flex items-center justify-between">

                    <span className="text-sm font-medium text-gray-700">
                        Total Pages
                    </span>

                    <span className="text-sm font-semibold text-gray-900">
                        {totalPages || "—"}
                    </span>

                </div>

                <div className="mt-2 flex items-center justify-between">

                    <span className="text-sm font-medium text-gray-700">
                        Progress
                    </span>

                    <span className="text-sm font-semibold text-indigo-600">
                        {progress}%
                    </span>

                </div>

            </div>

            {/* Progress */}

            <div>

                <div className="mb-2 flex items-center justify-between text-xs text-gray-500">

                    <span>
                        {book.status === "Want to Read"
                            ? "Not started"
                            : `${pagesRead} / ${totalPages} pages read`}
                    </span>

                    <span>
                        {progress}%
                    </span>

                </div>

                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">

                    <div
                        className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                        }}
                    />

                </div>

            </div>

            {/* Actions */}

            {/* Actions */}

            <div className="mt-auto grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">

                {book.status === "Reading" && (

                    <Button
                        variant="secondary"
                        onClick={() => onProgress(book)}
                        className="w-full"
                    >
                        Update Progress
                    </Button>

                )}

                <Button
                    variant="secondary"
                    onClick={() => onEdit(book)}
                    className="w-full cursor-pointer"
                >
                    Edit
                </Button>

                <Button
                    variant="danger"
                    onClick={() => onDelete(book._id)}
                    className="w-full cursor-pointer"
                >
                    Delete
                </Button>

            </div>

        </Card>
    );
}