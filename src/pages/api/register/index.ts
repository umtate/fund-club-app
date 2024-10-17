import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const USERS_URL: string = process.env.USERS_BASE_URL || "";

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

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await fetch(USERS_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...req.body, hashedPassword}),
    });
    res.status(201).json("User created successfully");
  } catch (error) {
    res.status(500).json(`Error creating user ${error}`);
  }
}
