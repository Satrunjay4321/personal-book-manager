"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { signup } from "@/services/authService";

export default function SignupPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
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

            const res = await signup(form);

            toast.success(res.data.message);

            router.push("/dashboard");
            router.refresh();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Signup Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">

            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

                <h1 className="mb-6 text-center text-3xl font-bold text-gray-400">
                    Signup
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

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
                        {loading ? "Creating..." : "Signup"}
                    </Button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-400">

                    Already have an account?

                    <Link
                        href="/login"
                        className="ml-2 font-semibold text-indigo-600 hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}