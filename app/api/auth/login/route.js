import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { comparePassword } from "../../../../lib/auth";
import { generateToken } from "../../../../lib/jwt";

export async function POST(request) {
    try {
        await connectDB();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email and password are required",
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid credentials",
                },
                { status: 401 }
            );
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid credentials",
                },
                { status: 401 }
            );
        }

        const token = generateToken(user._id);

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}