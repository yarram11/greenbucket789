// middleware.ts
import { withClerkMiddleware } from "@clerk/nextjs/server"; // Correct import
import { NextResponse } from "next/server";

export default withClerkMiddleware((req) => {
  // Log the full request URL and pathname for debugging
  console.log("Request URL:", req.url);
  console.log("Request Pathname:", req.nextUrl.pathname);

  const pathname = req.nextUrl.pathname;

  // Allow access to specific public pages
  if (pathname === "/sign-in" || pathname === "/forgot-password") {
    return NextResponse.next();
  }

  // You can add additional authentication logic here
  // Example:
  // if (!req.auth) {
  //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // }

  return NextResponse.next(); // Proceed to the requested route
});

// Define the routes that should use this middleware
export const config = {
  matcher: [
    // Exclude static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
