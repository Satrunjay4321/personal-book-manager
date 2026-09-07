"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
    addToWishlist,
    getWishlistBook,
    deleteWishlistBook,
    notifyWishlistUpdated,
} from "@/services/wishlistService";
import BookForm from "@/components/BookForm";
import Card from "@/components/ui/Card";

import { addBook } from "@/services/bookService";

export default function AddBookPage() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const wishlistId = searchParams.get("wishlistId");

    const [loading, setLoading] = useState(false);

    const [wishlistLoaded, setWishlistLoaded] = useState(false);

    const [initialBook, setInitialBook] = useState({});


    // --------------------------------
    // Load Wishlist Book
    // --------------------------------

    useEffect(() => {

        if (!wishlistId) {
            return;
        }

        const fetchWishlistBook = async () => {

            try {

                const res = await getWishlistBook(wishlistId);

                const wishlistItem = res.data.wishlistItem;

                setInitialBook({
                    title: wishlistItem.title || "",
                    author: wishlistItem.author || "",
                    summary: wishlistItem.summary || "",
                    pageCount: wishlistItem.pageCount || "",
                    pagesRead: 0,
                    status: "Want to Read",
                });

                setWishlistLoaded(true);
            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load wishlist book"
                );

                router.push("/wishlist");

            }

        };

        fetchWishlistBook();

    }, [wishlistId, router]);

    // --------------------------------
    // Add to Wishlist
    // --------------------------------

    const handleAddToWishlist = async (data) => {

        try {

            setLoading(true);

            const res = await addToWishlist(data);

            notifyWishlistUpdated();

            toast.success(res.data.message);

            router.push("/wishlist");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add book to wishlist"
            );

        } finally {

            setLoading(false);

        }

    };

    // --------------------------------
    // Submit Book
    // --------------------------------

    const handleSubmit = async (data) => {

        try {

            setLoading(true);

            // Create the book first
            const res = await addBook(data);

            // Remove from wishlist only after
            // the book was successfully created.
            if (wishlistId) {

                await deleteWishlistBook(wishlistId);
                notifyWishlistUpdated();


            }

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


    // --------------------------------
    // Wishlist loading
    // --------------------------------

    const wishlistLoading =
        Boolean(wishlistId) && !wishlistLoaded;


    if (wishlistLoading) {

        return (

            <div className="min-h-screen bg-gray-100 py-10">

                <div className="mx-auto max-w-4xl px-4">

                    <Card className="p-8">

                        <div className="flex min-h-[300px] items-center justify-center">

                            <p className="text-gray-500">
                                Loading book details...
                            </p>

                        </div>

                    </Card>

                </div>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-gray-100 py-10">

            <div className="mx-auto max-w-4xl px-4">

                <Card className="p-8">

                    <h1 className="mb-2 text-3xl font-bold text-gray-600">
                        Add Book
                    </h1>

                    <p className="mb-8 text-gray-500">

                        {wishlistId
                            ? "Review and edit the book details before adding it to your books."
                            : "Search a book online or fill the details manually."
                        }

                    </p>

                    <BookForm
                        initialData={initialBook}
                        loading={loading}
                        onSubmit={handleSubmit}
                        onAddToWishlist={handleAddToWishlist}
                        showOnlineSearch={!wishlistId}
                        showWishlistButton={!wishlistId}
                    />
                </Card>

            </div>

        </div>

    );

}