"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Card from "@/components/ui/Card";
import Loader from "@/components/ui/Loader";
import BookForm from "@/components/BookForm";

import {
    getBook,
    updateBook,
} from "@/services/bookService";

export default function EditBookPage() {

    const { id } = useParams();

    const router = useRouter();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (!id) return;

        const fetchBook = async () => {

            try {

                setLoading(true);

                const res = await getBook(id);

                setBook(res.data.book);

            } catch (error) {

                console.error(error);

                toast.error("Book not found");

                router.push("/dashboard");

            } finally {

                setLoading(false);

            }

        };

        fetchBook();

    }, [id, router]);

    const handleSubmit = async (data) => {

        try {

            setSaving(true);

            const res = await updateBook(id, data);

            toast.success(
                res.data.message || "Book updated successfully"
            );

            router.push("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update book"
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {
        return <Loader />;
    }

    if (!book) {
        return null;
    }

    return (

        <div className="min-h-screen bg-gray-100 py-10">

            <div className="mx-auto max-w-4xl px-4">

                <Card className="p-8">

                    <h1 className="mb-2 text-3xl font-bold text-gray-500">
                        Edit Book
                    </h1>

                    <p className="mb-8 text-gray-500">
                        Update your book details or search online
                        to replace the information.
                    </p>

                    <BookForm
                        initialData={book}
                        loading={saving}
                        onSubmit={handleSubmit}
                    />

                </Card>

            </div>

        </div>

    );
}