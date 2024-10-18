import { NextApiRequest, NextApiResponse } from "next";

const PRODUCTS_URL: string = process.env.BOOKS_BASE_URL || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const postRes = await handlePostRequest(req);
      res.status(200).json(postRes);
      break;
    case "GET":
      const getRes = await handleGetRequest();
      res.status(200).json(getRes);
      break;
    default:
      res.status(405).json("Method not allowed");
      break;
  }
}

const handlePostRequest = async (request: NextApiRequest) => {
  try {
    const result = await fetch(PRODUCTS_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.body),
    });
    return result.json();
  } catch (e) {
    console.log("Error creating book", e);
  }
};

const handleGetRequest = async () => {
  try {
    const result = await fetch(PRODUCTS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  } catch (e) {
    console.log("Error fetching books", e);
  }
};
