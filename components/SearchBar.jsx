"use client";

import { FiSearch } from "react-icons/fi";

export default function SearchBar({
    value,
    onChange,
}) {
    return (
        <div className="relative">

            <FiSearch
                className="absolute left-3 top-3 text-gray-400"
            />

            <input
                type="text"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder="Search books..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500" />

        </div>
    );
}