import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { addCSPToResponse } from "./utils/addCSPToResponse";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Handler to add the Content Security Policy (CSP) to the response
  addCSPToResponse(response, pathname);

  return response;
}
