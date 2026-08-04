"use client";

export default function FilterBar({
    status,
    setStatus,
}) {
    return (
        <select
            value={status}
            onChange={(e) =>
                setStatus(e.target.value)
            }
            className="rounded-lg border border-gray-300 px-4 py-2"
        >
            <option value="">
                All Status
            </option>

            <option value="Want to Read">
                Want To Read
            </option>

            <option value="Reading">
                Reading
            </option>

            <option value="Completed">
                Completed
            </option>

        </select>
    );
}