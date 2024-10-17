import { NextApiRequest, NextApiResponse } from "next";

const PRODUCTS_URL: string = process.env.BOOKS_BASE_URL || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { book_id } = req?.query;

  switch (req.method) {
    case "POST":
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
    case "GET":
      const getRes = await handleGetRequest(book_id as string ?? "");
      res.status(200).json(getRes);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const handleGetRequest = async (id: string) => {
  const result = await fetch(`${PRODUCTS_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.json();
};
