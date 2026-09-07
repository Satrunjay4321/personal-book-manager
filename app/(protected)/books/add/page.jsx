import { Suspense } from "react";
import AddBookClient from "./AddBookClient";

export default function AddBookPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gray-100 py-10">
                    <div className="mx-auto max-w-4xl px-4">
                        <div className="rounded-xl border bg-white p-8 shadow">
                            <div className="animate-pulse space-y-6">
                                <div className="h-8 w-40 rounded bg-gray-200" />
                                <div className="h-4 w-80 rounded bg-gray-200" />
                                <div className="h-32 rounded bg-gray-200" />
                                <div className="h-10 rounded bg-gray-200" />
                                <div className="h-10 rounded bg-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <AddBookClient />
        </Suspense>
    );
}