import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const USERS_URL: string = process.env.USERS_BASE_URL || "";
const APP_SECRET: string = process.env.APP_SECRET || "";

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

    const token = jwt.sign({ id: user?.uuid }, APP_SECRET, {
      expiresIn: "1h",
    });

    res.setHeader("Set-Cookie", [`token=${token}; HttpOnly; Secure; Path=/`]);

    res.status(200).json("logeed in");
  } catch (error) {
    res.status(500).json(`Login error ${error}`);
  }
};
