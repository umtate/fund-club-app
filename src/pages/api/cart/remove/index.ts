import { decrypt } from "@/functions";
import { Book, Cart, CartItem } from "@/lib/definitions";
import { NextApiRequest, NextApiResponse } from "next";

const CART_URL: string = process.env.CART_BASE_URL || "";
const PRODUCTS_URL: string = process.env.BOOKS_BASE_URL || "";
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
      const hydratedItems = await hydrateCartItems(postRes);
      res.status(200).json(hydratedItems);
      break;
    default:
      res.status(405).json("Method not allowed");
      break;
  }
}

const handlePostRequest = async (
  req: NextApiRequest,
  customerId: string
): Promise<Cart | undefined> => {
  try {
    const cartItems = await updateCartPaylod(req.body, customerId);
    const payload = {
      cartItems,
      customerId,
    };
    const result = await fetch(CART_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return result?.json();
  } catch (e) {
    console.log("Error creating cart", e);
  }
};

const updateCartPaylod = async (cartItem: Book, customerId: string) => {
  const currentCart = await handleGetRequest(customerId);
  const otherItems =
    currentCart !== null
      ? currentCart?.cartItems.filter(
          (items: CartItem) => items.productId !== cartItem?.id
        )
      : [];
  return otherItems;
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

const hydrateCartItems = async (items: Cart | undefined) => {
  try {
    const result = await fetch(`${PRODUCTS_URL}/books-by-id`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bookIds: items?.cartItems
          ? items.cartItems?.map((items: CartItem) => items.productId)
          : [],
      }),
    });
    return result.json();
  } catch (e) {
    console.log("Error fetching cart books", e);
  }
};
