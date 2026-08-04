export default function Card({
    children,
    className = "",
}) {
    return (
        <div
            className={`rounded-xl bg-white p-5 shadow-md border border-gray-200 ${className}`}
        >
            {children}
        </div>
    );
}