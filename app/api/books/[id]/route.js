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

export async function PUT(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        const userId = await getUserId();

        const body = await request.json();

        // Validate request body
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

        const book = await Book.findOneAndUpdate(
            {
                _id: id,
                user: userId,
            },
            {
                title: body.title,
                author: body.author,
                tags: body.tags,
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