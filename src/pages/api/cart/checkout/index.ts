import { NextApiRequest, NextApiResponse } from "next";

const CART_URL: string = process.env.CART_BASE_URL || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const postRes = await handlePostRequest(req);
      res.status(200).json(postRes);
      break;
    default:
      res.status(405).json("Method not allowed");
      break;
  }
}

const handlePostRequest = async (req: NextApiRequest): Promise<any> => {
  try {
    const cart = await handleGetRequest();

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

const handleGetRequest = async () => {
  try {
    const customerId = "7f000001-92a0-1823-8192-a61526c80000";
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
