import { createServerClient } from "@supabase/ssr";
import { NextResponse, NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🔒 Not logged in → redirect to landing page
  if (!user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Logged in but visiting exactly /home → redirect to /home/overview
  if (req.nextUrl.pathname === "/home") {
    return NextResponse.redirect(new URL("/home/overview", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/home", "/home/:path*"],
};
