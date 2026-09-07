"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Card from "@/components/ui/Card";
import WishlistForm from "@/components/WishlistForm";

import { addToWishlist } from "@/services/wishlistService";

export default function AddWishlistPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (data) => {

        try {

            setLoading(true);

            const res = await addToWishlist(data);

            toast.success(res.data.message);

            router.push("/wishlist");

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

                    <h1 className="mb-2 text-3xl font-bold">
                        Add to Wishlist
                    </h1>

                    <p className="mb-6 text-gray-500">
                        Add a book you wish to have or buy in the future.
                    </p>

                    <WishlistForm
                        loading={loading}
                        onSubmit={handleSubmit}
                    />

                </Card>

            </div>

        </div>

    );
}