import Navbar from "@/components/Navbar";

export default function ProtectedLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen">
                {children}
            </main>
        </>
    );
}