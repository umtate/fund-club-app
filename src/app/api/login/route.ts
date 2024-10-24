import { encrypt } from "@/functions";
import bcrypt from "bcryptjs";

const USERS_URL: string = process.env.USERS_BASE_URL || "";
// const AUTH_TOKEN: string = process.env.AUTH_TOKEN || "";

export async function POST(request: Request) {
  try {
    const req = await request.json()
    const result = await fetch(`${USERS_URL}/${req.email}`);

    const user = await result.json();

    if (user == null)
      return new Response("User not found!", {
        status: 404,
      });

    const isMatch = await bcrypt.compare(
      req.password,
      user.hashedPassword
    );

    if (!isMatch)
      return new Response("Incorrect password", {
        status: 400,
      });

    const session = await encrypt({ id: user.uuid });
    console.log(session)

    return new Response("Login success", {
      status: 200,
  //    headers: { "Set-Cookie": `${AUTH_TOKEN}=${session}` },
    });

  } catch (error) {
    return new Response(`Login error ${error}`, {
      status: 500,
    });  }
}
