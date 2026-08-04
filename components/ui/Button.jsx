export default function Button({
    children,
    type = "button",
    variant = "primary",
    className = "",
    disabled = false,
    ...props
}) {

    const variants = {
        primary:
            "bg-indigo-600 hover:bg-indigo-700 text-white",

        secondary:
            "bg-gray-200 hover:bg-gray-300 text-gray-800",

        danger:
            "bg-red-600 hover:bg-red-700 text-white",

        success:
            "bg-green-600 hover:bg-green-700 text-white",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={`w-full rounded-lg px-4 py-2 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}