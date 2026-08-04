import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    const publicRoutes = ["/login", "/signup"];

    // Redirect logged-in users away from auth pages
    if (token && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Protect pages
    if (
        (pathname.startsWith("/dashboard") ||
            pathname.startsWith("/books")) &&
        !token
    ) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/books/:path*",
        "/login",
        "/signup",
    ],
};