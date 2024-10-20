import { decrypt } from "@/functions";
import { NextApiRequest, NextApiResponse } from "next";

const CART_URL: string = process.env.CART_BASE_URL || "";
const AUTH_TOKEN: string = process.env.AUTH_TOKEN || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies[AUTH_TOKEN] ?? "";
  const user = await decrypt(token);
  const customerId: string = user?.id as string;
  switch (req.method) {
    case "POST":
      const postRes = await handlePostRequest(req, customerId);
      res.status(200).json(postRes);
      break;
    default:
      res.status(405).json("Method not allowed");
      break;
  }
}

const handlePostRequest = async (req: NextApiRequest, customerId: string): Promise<any> => {
  try {
    const cart = await handleGetRequest(customerId);

    const result = await fetch(`${CART_URL}/checkout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
    return result?.json();
  } catch (e) {
    console.log("Error creating cart", e);
  }
};

const handleGetRequest = async (customerId: string) => {
  try {
    const result = await fetch(`${CART_URL}/${customerId}`, {
      method: "GET",
    });
    if (result.headers.get("Content-Length") === "0") {
      return null;
    }
    return result.json();
  } catch (e) {
    console.log("Error getting cart", e);
  }
};
