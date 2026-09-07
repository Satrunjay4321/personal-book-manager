"use client";

import { X, AlertTriangle } from "lucide-react";
import Button from "./Button";

export default function ConfirmModal({
    open,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    loading = false,
}) {

    if (!open) {
        return null;
    }

    return (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">

                            <AlertTriangle
                                size={20}
                                className="text-red-600"
                            />

                        </div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            {title}
                        </h2>

                    </div>


                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Close"
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* Message */}

                <div className="px-6 py-5">

                    <p className="text-sm leading-6 text-gray-600">
                        {message}
                    </p>

                </div>


                {/* Actions */}

                <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>

                    <Button
                        type="button"
                        variant="danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading
                            ? "Removing..."
                            : confirmText
                        }
                    </Button>

                </div>

            </div>

        </div>

    );
}