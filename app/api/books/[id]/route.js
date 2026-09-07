import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import { getUserId } from "../../../../lib/getUser";
import { validateBook } from "../../../../lib/validation";
import Book from "../../../../models/Book";


// GET SINGLE BOOK
export async function GET(request, { params }) {
    try {

        await connectDB();

        const { id } = await params;

        const userId = await getUserId();

        const book = await Book.findOne({
            _id: id,
            user: userId,
        });

        if (!book) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Book not found",
                },
                {
                    status: 404,
                }
            );

        }

        return NextResponse.json({
            success: true,
            book,
        });

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



// UPDATE BOOK

// UPDATE BOOK
export async function PUT(request, { params }) {

    try {

        await connectDB();

        const { id } = await params;

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

        const book = await Book.findOneAndUpdate(

            {
                _id: id,
                user: userId,
            },

            {
                title: body.title.trim(),
                author: body.author.trim(),
                summary: body.summary?.trim() || "",
                pageCount: Number(body.pageCount),
                pagesRead,
                status: body.status,
            },

            {
                new: true,
                runValidators: true,
            }

        );

        if (!book) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Book not found",
                },
                {
                    status: 404,
                }
            );

        }

        return NextResponse.json({

            success: true,

            message: "Book updated successfully",

            book,

        });

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



// DELETE BOOK
export async function DELETE(request, { params }) {

    try {

        await connectDB();

        const { id } = await params;
        const userId = await getUserId();

        const book = await Book.findOneAndDelete({
            _id: id,
            user: userId,
        });

        if (!book) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Book not found",
                },
                {
                    status: 404,
                }
            );

        }

        return NextResponse.json({
            success: true,
            message: "Book deleted successfully",
        });

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