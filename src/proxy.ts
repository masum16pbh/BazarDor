import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        const currentPath = request.nextUrl.pathname;
        const loginUrl = new URL("/signin", request.url);
        loginUrl.searchParams.set("callbackURL", currentPath);
        return NextResponse.redirect(loginUrl);

    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/details/:path*", "/profile"], // Specify the routes the middleware applies to
};