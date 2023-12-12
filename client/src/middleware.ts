import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let locales = ["en", "es"];
export let defaultLocale = "en";

function getLocale(request: Request): string {
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get("accept-language");
  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage.replaceAll("_", "-"));
  }

  const headersObject = Object.fromEntries(headers.entries());
  const languages = new Negotiator({ headers: headersObject }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {

    // let isLoggedIn = request.cookies.get("token");
    // let url = request.url;

    // if(!isLoggedIn && (!url.includes("login") || !url.includes("register"))){
    //   console.log(isLoggedIn)
    //   return NextResponse.rewrite("http://localhost:3000/login");
    // }

    // if(isLoggedIn && (url.includes("login") || url.includes("register"))){
    //   return NextResponse.redirect("http://localhost:3000/restaurants");
    // }


  let locale = getLocale(request) ?? defaultLocale;
  const pathname = request.nextUrl.pathname;

  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
