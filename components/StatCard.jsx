import Card from "./ui/Card";

export default function StatCard({
    title,
    value,
    color,
}) {
    return (
        <Card className="transition hover:shadow-lg">

            <h4 className="text-gray-500 text-sm">
                {title}
            </h4>

            <h2
                className={`mt-2 text-4xl font-bold ${color}`}
            >
                {value}
            </h2>

        </Card>
    );
}