import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./functions";

const AUTH_TOKEN: string = process.env.AUTH_TOKEN || "";

export const middleware = async (req: NextRequest) => {
  try {
    const token = req.cookies?.get(AUTH_TOKEN)?.value ?? null;
    if (!token) return invalidToken();

    const user = await decrypt(token);
    if (!user) return invalidToken();

    return NextResponse.next();
  } catch (err) {
    console.log("Invalid token", err);

    return invalidToken();
  }

  function invalidToken() {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set(AUTH_TOKEN, "", { maxAge: -1 });
    return response;
  }
};

export const config = {
  matcher: ["/api/cart", "/api/cart/checkout", "/api/cart/remove"],
};
