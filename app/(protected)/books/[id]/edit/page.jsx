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

        const fetchBook = async () => {

            try {

                const res = await getBook(id);

                setBook(res.data.book);

            } catch {

                toast.error("Book not found");

                router.push("/dashboard");

            } finally {

                setLoading(false);

            }

        };

        fetchBook();

    }, [id]);

    const handleSubmit = async (data) => {

        try {

            setSaving(true);

            const res = await updateBook(id, data);

            toast.success(res.data.message);

            router.push("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update"
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading)
        return <Loader />;

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="mx-auto max-w-2xl">

                <Card>

                    <h1 className="mb-6 text-3xl font-bold">
                        Edit Book
                    </h1>

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