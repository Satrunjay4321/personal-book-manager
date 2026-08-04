import StatCard from "./StatCard";

export default function DashboardStats({ books }) {

    const total = books.length;

    const reading = books.filter(
        (book) => book.status === "Reading"
    ).length;

    const completed = books.filter(
        (book) => book.status === "Completed"
    ).length;

    const wantToRead = books.filter(
        (book) => book.status === "Want to Read"
    ).length;

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <StatCard
                title="Total Books"
                value={total}
                color="text-indigo-600"
            />

            <StatCard
                title="Reading"
                value={reading}
                color="text-blue-600"
            />

            <StatCard
                title="Completed"
                value={completed}
                color="text-green-600"
            />

            <StatCard
                title="Want To Read"
                value={wantToRead}
                color="text-yellow-500"
            />

        </div>
    );
}