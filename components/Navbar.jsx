"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiBookOpen } from "react-icons/fi";
import { LogOut } from "lucide-react";
import { logout } from "@/services/authService";
import toast from "react-hot-toast";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    // Temporary user
    // Later replace this with data from /api/auth/me
    const user = {
        name: "Satrunjay",
        email: "satrunjay@gmail.com",
    };

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

    return (
        <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}

                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-2xl font-bold text-indigo-600"
                >
                    <FiBookOpen size={28} />
                    <span>Book Manager</span>
                </Link>

                {/* Navigation */}

                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/dashboard"
                        className={`font-medium transition ${
                            pathname === "/dashboard"
                                ? "text-indigo-600"
                                : "text-gray-600 hover:text-indigo-600"
                        }`}
                    >
                        Dashboard
                    </Link>
                </div>

                {/* Right Side */}

                <div className="flex items-center gap-5">

                    {/* User */}

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white shadow">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="hidden md:block">
                            <p className="text-sm font-semibold text-gray-800">
                                {user.name}
                            </p>

                            <p className="text-xs text-gray-500">
                                {user.email}
                            </p>
                        </div>

                    </div>

                    {/* Logout */}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}