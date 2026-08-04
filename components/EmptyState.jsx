import Link from "next/link";

export default function EmptyState() {
    return (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">

            <h2 className="text-2xl font-semibold">
                📚 No Books Found
            </h2>

            <p className="mt-3 text-gray-500">
                Start building your personal library.
            </p>

            <Link href="/books/add">
                <button className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
                    Add Your First Book
                </button>
            </Link>

        </div>
    );
}