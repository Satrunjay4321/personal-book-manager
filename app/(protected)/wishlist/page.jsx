"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ui/ConfirmModal";
import toast from "react-hot-toast";
import WishlistSkeleton from "@/components/WishlistSkeleton";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
    getWishlist,
    deleteWishlistBook,
    notifyWishlistUpdated,
} from "@/services/wishlistService";

// import {
//     getWishlist,
//     deleteWishlistBook,
// } from "@/services/wishlistService";

export default function WishlistPage() {

    const router = useRouter();

    // null = still loading
    // [] = loaded but empty
    const [wishlist, setWishlist] = useState(null);

    const [deleteBook, setDeleteBook] = useState(null);

    const [deletingId, setDeletingId] = useState(null);


    const [deleteLoading, setDeleteLoading] = useState(false);


    // --------------------------------
    // Load Wishlist
    // --------------------------------

    useEffect(() => {

        let cancelled = false;

        getWishlist()
            .then((res) => {

                if (!cancelled) {
                    setWishlist(res.data.wishlist || []);
                }

            })
            .catch((error) => {

                if (!cancelled) {

                    toast.error(
                        error.response?.data?.message ||
                        "Failed to load wishlist"
                    );

                    setWishlist([]);

                }

            });

        return () => {
            cancelled = true;
        };

    }, []);


    // --------------------------------
    // Delete Wishlist Book
    // --------------------------------

    // const handleDelete = async (id) => {

    //     const confirmDelete = window.confirm(
    //         "Remove this book from your wishlist?"
    //     );

    //     if (!confirmDelete) {
    //         return;
    //     }

    //     try {

    //         const res = await deleteWishlistBook(id);

    //         toast.success(res.data.message);

    //         // Remove it locally instead of
    //         // fetching the entire wishlist again.
    //         setWishlist((current) =>
    //             current.filter((book) => book._id !== id)
    //         );

    //     } catch (error) {

    //         console.error(error);

    //         toast.error(
    //             error.response?.data?.message ||
    //             "Failed to remove book"
    //         );

    //     }

    // };

    const handleDelete = async (id) => {

        try {

            setDeletingId(id);

            const res = await deleteWishlistBook(id);

            toast.success(res.data.message);

            notifyWishlistUpdated();

            setTimeout(() => {

                setWishlist((current) =>
                    current.filter(
                        (book) => book._id !== id
                    )
                );

                setDeletingId(null);

            }, 350);

        } catch (error) {

            console.error(error);

            setDeletingId(null);

            toast.error(
                error.response?.data?.message ||
                "Failed to remove book"
            );

        }

    };

    const handleConfirmDelete = async () => {

        if (!deleteBook) {
            return;
        }

        try {

            setDeleteLoading(true);

            const res = await deleteWishlistBook(
                deleteBook._id
            );

            toast.success(res.data.message);

            setWishlist((current) =>
                current.filter(
                    (book) => book._id !== deleteBook._id
                )
            );

            setDeleteBook(null);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to remove book"
            );

        } finally {

            setDeleteLoading(false);

        }

    };

    // --------------------------------
    // Move Wishlist Book to My Books
    // --------------------------------

    const handleAddToBooks = (book) => {

        router.push(
            `/books/add?wishlistId=${book._id}`
        );

    };


    // --------------------------------
    // Loading
    // --------------------------------

    // if (wishlist === null) {
    //     return <Loader />;
    // }


    return (

        <div className="min-h-screen bg-gray-100">

            <div className="mx-auto max-w-7xl p-6">

                {/* Header */}

                <div className="mb-8 flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            My Wishlist
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Books you wish to have in the future or plan to buy.
                        </p>

                    </div>

                    <Button
                        onClick={() =>
                            router.push("/books/add")
                        }
                    >
                        + Add Book
                    </Button>

                </div>


                {/* Empty Wishlist */}
                {wishlist === null ? (

                    <WishlistSkeleton />

                ) : wishlist.length === 0 ? (

                    <Card>

                        <div className="py-12 text-center">

                            <h2 className="text-xl font-semibold text-gray-700">
                                Your wishlist is empty
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Add books you want to have or buy in the future.
                            </p>

                            <Button
                                className="mt-5"
                                onClick={() =>
                                    router.push("/books/add")
                                }
                            >
                                Add to Wishlist
                            </Button>

                        </div>

                    </Card>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {wishlist.map((book) => (

                            // <Card
                            //     key={book._id}
                            //     className="space-y-4"
                            // >

                            //     <div>

                            //         <h2 className="truncate text-xl font-semibold text-gray-800">
                            //             {book.title}
                            //         </h2>

                            //         <p className="text-gray-500">
                            //             {book.author}
                            //         </p>

                            //     </div>


                            //     {book.summary && (

                            //         <p className="line-clamp-3 text-sm text-gray-600">
                            //             {book.summary}
                            //         </p>

                            //     )}


                            //     <p className="text-sm text-gray-500">
                            //         {book.pageCount} Pages
                            //     </p>


                            //     <div className="flex gap-3 pt-2">

                            //         <Button
                            //             onClick={() =>
                            //                 handleAddToBooks(book)
                            //             }
                            //         >
                            //             Add to My Books
                            //         </Button>

                            //         <Button
                            //             variant="danger"
                            //             onClick={() =>
                            //                 handleDelete(book)
                            //             }
                            //         >
                            //             Remove
                            //         </Button>

                            //     </div>

                            // </Card>

                            <div
                                key={book._id}
                                className={`transition-all duration-300 ease-in-out ${deletingId === book._id
                                        ? "scale-95 opacity-0"
                                        : "scale-100 opacity-100"
                                    }`}
                            >
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


                                    <p className="text-sm text-gray-500">
                                        {book.pageCount} Pages
                                    </p>


                                    <div className="flex gap-3 pt-2">

                                        <Button
                                            onClick={() =>
                                                handleAddToBooks(book)
                                            }
                                            disabled={deletingId === book._id}
                                        >
                                            Add to My Books
                                        </Button>

                                        <Button
                                            variant="danger"
                                            disabled={deletingId === book._id}
                                            onClick={() =>
                                                handleDelete(book._id)
                                            }
                                        >
                                            {deletingId === book._id
                                                ? "Removing..."
                                                : "Remove"
                                            }
                                        </Button>

                                    </div>

                                </Card>

                            </div>

                        ))}

                    </div>

                )
                }

            </div>
            <ConfirmModal
                open={Boolean(deleteBook)}
                title="Remove from Wishlist"
                message={
                    deleteBook
                        ? `Are you sure you want to remove "${deleteBook.title}" from your wishlist?`
                        : ""
                }
                confirmText="Remove"
                cancelText="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteBook(null)}
                loading={deleteLoading}
            />
        </div>

    );

}