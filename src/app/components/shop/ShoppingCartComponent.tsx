"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ShoppingCartComponent() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/cart", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
      });
  }, []);

  const handleRemoveItem = (item: any) => {
    fetch("/api/cart/remove", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
      });
  };

  const router = useRouter();
  return (
    <div className="shopping-cart">
      <div className="mb-8">
        <Button variant="secondary" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <h1 className="text-2xl font-light">Shopping Cart</h1>

      <div className="hidden md:grid grid-cols-4 text-gray-600 py-4 border-b border-gray-300">
        <span>Product</span>
        <span>Price</span>
        <span>Remove</span>
        <span className="text-right">Total</span>
      </div>

      {cartItems?.map((item) => {
        return (
          <div className="grid grid-cols-12 items-center py-4 border-b border-gray-300">
            <div className="col-span-3">
              <img src={item?.image} alt={item?.title} className="w-24" />
              <div className="font-bold mt-4">{item?.title}</div>
            </div>
            <div className="col-span-3">${item?.price}</div>

            <div className="col-span-1">
              <Button
                variant="destructive"
                onClick={() => handleRemoveItem(item)}
              >
                Remove
              </Button>
            </div>
            <div className="text-right col-span-5">${item?.price}</div>
          </div>
        );
      })}

      <div className="text-right py-8">
        <Button>Checkout</Button>
      </div>
    </div>
  );
}

export default ShoppingCartComponent;
