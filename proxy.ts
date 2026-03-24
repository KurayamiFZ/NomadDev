import { createServerClient } from "@supabase/ssr";
import { NextResponse, NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // If trying to access protected routes, redirect to login
    if (req.nextUrl.pathname.startsWith("/home") || req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // For other routes, continue normally
    return response;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";
  const isPathAdmin = req.nextUrl.pathname.startsWith("/admin");

  if (isPathAdmin && !isAdmin) {
    return NextResponse.redirect(new URL("/home/overview", req.url));
  }

  if (req.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (req.nextUrl.pathname === "/home") {
    return NextResponse.redirect(new URL("/home/overview", req.url));
  }

  // If authenticated user tries to access login, redirect to home
  if (user && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/home/overview", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/home", "/home/:path*", "/admin", "/admin/:path*", "/login"],
};
