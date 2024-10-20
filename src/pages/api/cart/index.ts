import { NextApiRequest, NextApiResponse } from "next";

const CART_URL: string = process.env.CART_BASE_URL || "";
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
      const getCartItems = await handleGetRequest();
      const hydratedItems = await hydrateCartItems(getCartItems);
      res.status(200).json(hydratedItems);
      break;
    default:
      res.status(405).json("Method not allowed");
      break;
  }
}

const handlePostRequest = async (req: NextApiRequest): Promise<any> => {
  try {
    const cartItems = await updateCartPaylod(req.body);
    const payload = {cartItems, customerId: "7f000001-92a0-1823-8192-a61526c80000"}
    const result = await fetch(CART_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return result?.json();
  } catch (e) {
    console.log("Error creating cart", e);
  }
};

const updateCartPaylod = async (cartItem: any) => {
  const currentCart = await handleGetRequest();
  const otherItems = currentCart !== null ? currentCart?.cartItems.filter(
    (items: any) => items.productId !== cartItem.productId
  ) : []
  return [...otherItems, cartItem]
};

const handleGetRequest = async () => {
  try {
    const customerId = "7f000001-92a0-1823-8192-a61526c80000";
    const result = await fetch(`${CART_URL}/${customerId}`, {
      method: "GET",
    });
    if (result.headers.get('Content-Length') === '0') {
	return null; 
      }
    return result.json();
  } catch (e) {
    console.log("Error getting cart", e);
  }
};

const hydrateCartItems = async (cartItems: any) => {
  try {
    const result = await fetch(`${PRODUCTS_URL}/books-by-id`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookIds: cartItems.cartItems.map((items: any) => items.productId),
      }),
    });
    return result.json();
  } catch (e) {
    console.log("Error fetching cart books", e);
  }
};
