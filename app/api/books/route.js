import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import { getUserId } from "../../../lib/getUser";
import { validateBook } from "../../../lib/validation";
import Book from "../../../models/Book";

// GET ALL BOOKS
export async function GET() {
    try {
        await connectDB();

        const userId = await getUserId();

        const books = await Book.find({ user: userId }).sort({
            createdAt: -1,
        });

        return NextResponse.json({
            success: true,
            books,
        });

    } catch (error) {

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 401,
            }
        );
    }
}



// CREATE BOOK
export async function POST(request) {
    try {

        await connectDB();

        const userId = await getUserId();

        const body = await request.json();

        // Validation
        const error = validateBook(body);

        if (error) {
            return NextResponse.json(
                {
                    success: false,
                    message: error,
                },
                {
                    status: 400,
                }
            );
        }

        // Business Logic

        let pagesRead = Number(body.pagesRead || 0);

        if (body.status === "Want to Read") {
            pagesRead = 0;
        }

        if (body.status === "Completed") {
            pagesRead = Number(body.pageCount);
        }

        const book = await Book.create({
            title: body.title.trim(),
            author: body.author.trim(),
            summary: body.summary?.trim() || "",
            pageCount: Number(body.pageCount),
            pagesRead,
            status: body.status,
            user: userId,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Book added successfully.",
                book,
            },
            {
                status: 201,
            }
        );

    } catch (error) {

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