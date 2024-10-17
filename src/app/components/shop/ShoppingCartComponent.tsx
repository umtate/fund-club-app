"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

export function ShoppingCartComponent() {
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

      <div className="grid grid-cols-12 items-center py-4 border-b border-gray-300">
        <div className="col-span-3">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/81djg0KWthS.jpg"
            alt="Dingo Dog Bones"
            className="w-24"
          />
          <div className="font-bold mt-4">After You</div>
        </div>
        <div className="col-span-3">$25.98</div>

        <div className="col-span-1">
          <Button variant="destructive">Remove</Button>
        </div>
        <div className="text-right col-span-5">$90.57</div>
      </div>

      <div className="text-right py-8">
        <Button>Checkout</Button>
      </div>
    </div>
  );
}

export default ShoppingCartComponent;
