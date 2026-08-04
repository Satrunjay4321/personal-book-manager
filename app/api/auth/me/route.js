import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { verifyToken } from "../../../../lib/jwt";

export async function GET() {
    try {
        await connectDB();

        const cookieStore = await cookies();

        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid Token",
            },
            { status: 401 }
        );
    }
}