"use client";

import Button from "./ui/Button";
import Card from "./ui/Card";

export default function WishlistCard({
    book,
    onAdd,
    onDelete,
}) {

    return (

        <Card className="space-y-4">

            <div>

                <h2 className="truncate text-xl font-semibold text-gray-800">
                    {book.title}
                </h2>

                <p className="text-gray-500">
                    {book.author}
                </p>

            </div>


            {book.summary && (

                <p className="line-clamp-3 text-sm text-gray-600">
                    {book.summary}
                </p>

            )}


            <div className="text-sm text-gray-500">

                {book.pageCount} Pages

            </div>


            <div className="flex gap-3 pt-2">

                <Button
                    onClick={() => onAdd(book)}
                >
                    Add to My Books
                </Button>

                <Button
                    variant="danger"
                    onClick={() => onDelete(book._id)}
                >
                    Remove
                </Button>

            </div>

        </Card>

    );
}