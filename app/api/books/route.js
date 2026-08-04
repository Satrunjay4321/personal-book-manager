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

        // const {
        //     title,
        //     author,
        //     tags,
        //     status,
        // } = await request.json();

        const body = await request.json();

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

        const { title, author, tags, status } = body;

        const book = await Book.create({
            user: userId,
            title,
            author,
            tags,
            status,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Book added successfully",
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