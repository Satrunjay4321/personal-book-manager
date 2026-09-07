import { NextResponse } from "next/server";

export async function GET(request) {

    try {

        const { searchParams } = new URL(request.url);

        const query = searchParams.get("q");

        if (!query || query.trim() === "") {

            return NextResponse.json(
                {
                    success: false,
                    message: "Search query is required.",
                },
                {
                    status: 400,
                }
            );

        }

        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&key=${process.env.GOOGLE_BOOKS_API_KEY}`
        );

        if (!response.ok) {

            const errorText = await response.text();
            console.error("Google API responded with an error:", errorText);
            return NextResponse.json(
                {
                    success: false,
                    message: "Unable to fetch books.",
                },
                {
                    status: 500,
                }
            );

        }

        const data = await response.json();

        const books = (data.items || []).map((item) => {

            const info = item.volumeInfo;

            return {

                id: item.id,

                title: info.title || "",

                author:
                    info.authors?.join(", ") || "Unknown",

                summary:
                    info.description || "",

                pageCount:
                    info.pageCount || 0,

            };

        });

        return NextResponse.json({

            success: true,

            books,

        });

    } catch (error) {

        console.error("Internal Server Error Details:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
            }
        );

    }

}