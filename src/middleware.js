import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
let defaultLocale =
  (typeof window !== "undefined" && localStorage.getItem("lang")) || "ua";

let headers = {
  "accept-language": `${defaultLocale};q=0.5`,
};
let languages = new Negotiator({ headers }).languages();

let locales = ["en", "ua"];

// Get the preferred locale, similar to above or using a library
function getLocale(request) {
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  // console.log("pathnameIsMissingLocale", pathnameIsMissingLocale);
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next))",
    // "/:path",

    // Optional: only run on root (/) URL
    // '/'
  ],
};
