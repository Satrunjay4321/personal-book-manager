export default function Badge({ status }) {

    const styles = {
        "Want to Read":
            "bg-yellow-100 text-yellow-700",

        Reading:
            "bg-blue-100 text-blue-700",

        Completed:
            "bg-green-100 text-green-700",
    };

    return (
        <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
        >
            {status}
        </span>
    );
}