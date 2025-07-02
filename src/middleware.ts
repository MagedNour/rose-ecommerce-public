import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { LOCALES, routing } from "./i18n/routing";

const privatePages = ["/dashboard", "/orders", "/profile"];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    // Apply i18n routing after authentication is verified
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/",
      error: "/",
    },
  },
);

export default function middleware(req: NextRequest) {
  // Apply i18n routing for private pages
  const privatePathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${privatePages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  // Check if the request is for a private page
  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

  // Apply authentication middleware for private pages
  if (isPrivatePage) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  } else {
    return handleI18nRouting(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
