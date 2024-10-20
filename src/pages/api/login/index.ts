import 'server-only';

import { encrypt } from "@/functions";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const USERS_URL: string = process.env.USERS_BASE_URL || "";
const AUTH_TOKEN: string = process.env.AUTH_TOKEN || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await handlePostRequest(req, res);
      break;
    default:
      res.status(405).json("Method not allowed");
      break;
  }
}

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch(`${USERS_URL}/${req.body.email}`);

    const user = await result.json();

    if (user == null) return res.status(404).json("User not found");

    const isMatch = await bcrypt.compare(
      req.body.password,
      user.hashedPassword
    );

    if (!isMatch) return res.status(400).json("Incorrect password");

    const session = await encrypt({ id: user.uuid });

    res.setHeader("Set-Cookie", [`${AUTH_TOKEN}=${session}; HttpOnly; Secure; Path=/`]);

    res.status(200).json("logeed in");

  } catch (error) {
    res.status(500).json(`Login error ${error}`);
  }
};
