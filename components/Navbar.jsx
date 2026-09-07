"use client";

import { getWishlist } from "@/services/wishlistService";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart } from "lucide-react";

import {
    FiBookOpen,
    FiLogOut,
    FiGrid,
} from "react-icons/fi";

import toast from "react-hot-toast";

import {
    logout,
    getCurrentUser,
} from "@/services/authService";


export default function Navbar() {

    const pathname = usePathname();
    const router = useRouter();

    const [wishlistCount, setWishlistCount] = useState(0);
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);


    // Fetch the number of books in the Wishlist

    useEffect(() => {

        const fetchWishlistCount = async () => {

            try {

                const res = await getWishlist();

                setWishlistCount(
                    res.data.wishlist?.length || 0
                );

            } catch (error) {

                console.error(
                    "Failed to load wishlist count",
                    error
                );

            }

        };

        fetchWishlistCount();

        const handleWishlistUpdate = () => {
            fetchWishlistCount();
        };

        window.addEventListener(
            "wishlistUpdated",
            handleWishlistUpdate
        );

        return () => {

            window.removeEventListener(
                "wishlistUpdated",
                handleWishlistUpdate
            );

        };

    }, []);


    // --------------------------------
    // Load Current User
    // --------------------------------

    useEffect(() => {

        let cancelled = false;

        const loadUser = async () => {

            try {

                const res = await getCurrentUser();

                if (!cancelled) {
                    setUser(res.data.user);
                }

            } catch (error) {

                console.error(
                    "Failed to load current user:",
                    error
                );

                if (!cancelled) {
                    setUser(null);
                }

            } finally {

                if (!cancelled) {
                    setUserLoading(false);
                }

            }

        };

        loadUser();

        return () => {
            cancelled = true;
        };

    }, []);


    // --------------------------------
    // Logout
    // --------------------------------

    const handleLogout = async () => {

        try {

            await logout();

            toast.success("Logged out successfully");

            router.push("/login");

        } catch (error) {

            console.error(error);

            toast.error("Logout failed");

        }

    };


    // --------------------------------
    // User Initial
    // --------------------------------

    const userInitial =
        user?.name?.charAt(0)?.toUpperCase() || "?";


    return (

        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

            <div className="mx-auto grid h-19 max-w-7xl grid-cols-3 items-center px-6">


                {/* ========================================= */}
                {/* LOGO */}
                {/* ========================================= */}

                <div className="flex justify-start">

                    <Link
                        href="/dashboard"
                        className="group flex items-center gap-3"
                    >

                        {/* Logo Mark */}

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">

                            <FiBookOpen
                                size={25}
                                strokeWidth={2}
                            />

                        </div>


                        {/* Logo Text */}

                        <div className="hidden sm:block">

                            <div className="text-[21px] font-bold leading-5 tracking-tight text-gray-900">

                                Book
                                <span className="text-indigo-600">
                                    Manager
                                </span>

                            </div>

                            <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">

                                Personal Library

                            </div>

                        </div>

                    </Link>

                </div>


                {/* ========================================= */}
                {/* CENTER NAVIGATION */}
                {/* ========================================= */}

                <div className="flex justify-center">

                    <Link
                        href="/dashboard"
                        className={`group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${pathname === "/dashboard"
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                    >

                        <FiGrid
                            size={17}
                            className={
                                pathname === "/dashboard"
                                    ? "text-indigo-600"
                                    : "text-gray-400 group-hover:text-gray-700"
                            }
                        />

                        <span>
                            Dashboard
                        </span>

                    </Link>

                </div>


                {/* ========================================= */}
                {/* RIGHT ACTIONS */}
                {/* ========================================= */}

                <div className="relative flex justify-end">

                    <div className="flex items-center gap-2">


                        {/* --------------------------------- */}
                        {/* WISHLIST */}
                        {/* --------------------------------- */}

                        <Link
                            href="/wishlist"
                            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 hover:shadow-md"
                        >
                            <Heart
                                size={21}
                                className="transition group-hover:fill-red-500"
                            />

                            {wishlistCount > 0 && (

                                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white shadow">

                                    {wishlistCount > 99
                                        ? "99+"
                                        : wishlistCount
                                    }

                                </span>

                            )}

                        </Link>


                        {/* --------------------------------- */}
                        {/* PROFILE */}
                        {/* --------------------------------- */}

                        <div className="group relative">

                            <button
                                type="button"
                                aria-label="Profile"
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md"
                            >

                                {userLoading
                                    ? "..."
                                    : userInitial
                                }

                            </button>


                            {/* Profile Hover Card */}

                            {!userLoading && user && (

                                <div className="pointer-events-none absolute right-0 top-14 w-64 translate-y-1 rounded-xl border border-gray-200 bg-white p-4 opacity-0 shadow-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">

                                    <div className="flex items-center gap-3">

                                        {/* Avatar */}

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">

                                            {userInitial}

                                        </div>


                                        {/* User Details */}

                                        <div className="min-w-0">

                                            <p className="truncate text-sm font-semibold text-gray-900">

                                                {user.name}

                                            </p>

                                            <p className="truncate text-xs text-gray-500">

                                                {user.email}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* --------------------------------- */}
                        {/* LOGOUT */}
                        {/* --------------------------------- */}

                        <button
                            type="button"
                            onClick={handleLogout}
                            aria-label="Logout"
                            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-transparent text-gray-500 transition-all duration-200 hover:border-red-100 hover:bg-red-50 hover:text-red-600 hover:shadow-sm"
                        >

                            <FiLogOut
                                size={21}
                                strokeWidth={2}
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />

                            {/* Tooltip */}

                            <span className="pointer-events-none absolute right-0 top-14 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg group-hover:block">

                                Logout

                            </span>

                        </button>

                    </div>

                </div>

            </div>

        </nav>

    );
}