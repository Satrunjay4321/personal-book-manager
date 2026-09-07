import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getUserId } from "@/lib/getUser";
import Wishlist from "@/models/Wishlist";


// GET SINGLE WISHLIST ITEM
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const userId = await getUserId();

        const wishlistItem = await Wishlist.findOne({
            _id: id,
            user: userId,
        });

        if (!wishlistItem) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Wishlist item not found.",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            success: true,
            wishlistItem,
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


// DELETE WISHLIST ITEM
export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const userId = await getUserId();

        const wishlistItem =
            await Wishlist.findOneAndDelete({
                _id: id,
                user: userId,
            });

        if (!wishlistItem) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Wishlist item not found.",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Book removed from wishlist.",
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