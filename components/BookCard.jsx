"use client";

import Link from "next/link";

import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function BookCard({
    book,
    onDelete,
}) {
    return (
        <Card className="space-y-4">

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-xl font-semibold text-gray-900">
                        {book.title}
                    </h2>

                    <p className="text-gray-500">
                        {book.author}
                    </p>

                </div>

                <Badge status={book.status} />

            </div>

            <div className="flex flex-wrap gap-2">

                {book.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700"
                    >
                        {tag}
                    </span>
                ))}

            </div>

            <div className="flex gap-3">

                <Link
                    href={`/books/${book._id}/edit`}
                    className="flex-1"
                >
                    <Button
                        variant="secondary"
                        className="w-full"
                    >
                        Edit
                    </Button>
                </Link>

                <Button
                    variant="danger"
                    className="flex-1"
                    onClick={() => onDelete(book._id)}
                >
                    Delete
                </Button>

            </div>

        </Card>
    );
}