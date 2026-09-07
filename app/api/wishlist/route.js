import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getUserId } from "@/lib/getUser";
import Wishlist from "@/models/Wishlist";
import Book from "@/models/Book";


// --------------------------------
// GET ALL WISHLIST BOOKS
// --------------------------------

export async function GET() {

    try {

        await connectDB();

        const userId = await getUserId();

        const wishlist = await Wishlist.find({
            user: userId,
        }).sort({
            createdAt: -1,
        });

        return NextResponse.json({
            success: true,
            wishlist,
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


// --------------------------------
// ADD BOOK TO WISHLIST
// --------------------------------

export async function POST(request) {

    try {

        await connectDB();

        const userId = await getUserId();

        const body = await request.json();


        // --------------------------------
        // Basic validation
        // --------------------------------

        if (!body.title?.trim()) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Title is required.",
                },
                {
                    status: 400,
                }
            );

        }

        if (!body.author?.trim()) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Author is required.",
                },
                {
                    status: 400,
                }
            );

        }


        const title = body.title.trim();
        const author = body.author.trim();


        // --------------------------------
        // CHECK MY BOOKS
        // --------------------------------

        const existingBook = await Book.findOne({
            user: userId,
            title: title,
            author: author,
        });

        if (existingBook) {

            return NextResponse.json(
                {
                    success: false,
                    message: "This book is already in your library.",
                },
                {
                    status: 409,
                }
            );

        }


        // --------------------------------
        // CHECK WISHLIST
        // --------------------------------

        const existingWishlistBook =
            await Wishlist.findOne({
                user: userId,
                title: title,
                author: author,
            });

        if (existingWishlistBook) {

            return NextResponse.json(
                {
                    success: false,
                    message: "This book is already in your wishlist.",
                },
                {
                    status: 409,
                }
            );

        }


        // --------------------------------
        // CREATE WISHLIST BOOK
        // --------------------------------

        const wishlistBook = await Wishlist.create({

            title,

            author,

            summary: body.summary?.trim() || "",

            pageCount: Number(body.pageCount) || 0,

            pagesRead: 0,

            status: "Want to Read",

            user: userId,

        });


        return NextResponse.json(
            {
                success: true,

                message: "Book added to wishlist.",

                wishlistBook,
            },
            {
                status: 201,
            }
        );

    } catch (error) {

        console.error("Wishlist POST error:", error);

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