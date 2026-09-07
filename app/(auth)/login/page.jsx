"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

import { login } from "@/services/authService";

export default function LoginPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await login(form);

            toast.success(res.data.message);

            router.push("/dashboard");
            router.refresh();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">

            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

                <h1 className="mb-6 text-center text-3xl font-bold text-gray-400">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-400">

                    Don&apost have an account?

                    <Link
                        href="/signup"
                        className="ml-2 font-semibold text-indigo-600 hover:underline"
                    >
                        Signup
                    </Link>

                </p>

            </div>

        </div>
    );
}