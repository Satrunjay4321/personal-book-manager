"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import BookForm from "@/components/BookForm";
import Card from "@/components/ui/Card";

import { addBook } from "@/services/bookService";

export default function AddBookPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {

        try {

            setLoading(true);

            const res = await addBook(data);

            toast.success(res.data.message);

            router.push("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add book"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="mx-auto max-w-2xl">

                <Card>

                    <h1 className="mb-6 text-3xl font-bold">
                        Add Book
                    </h1>

                    <BookForm
                        loading={loading}
                        onSubmit={handleSubmit}
                    />

                </Card>

            </div>

        </div>

    );

}