"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";
import { Book_v2 } from "@/app/types/Book";

interface Props {
  book: Book_v2
}

export function BookComponent({book} : Props) {
  const router = useRouter();

  return (
    <div className="wrapper mx-auto w-full max-w-6xl p-4">
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => router.push("/shop/products")}>
                Books
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Book</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>{" "}
      <div className="product-top flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img
            src={book?.image}
            alt="Product Image 1"
            className="w-1/2 rounded-lg transition-transform transform hover:scale-105 shadow-md"
          />
        </div>
        <div className="relative md:w-2/3">
          <div className="sticky top-0 py-16">
            <h1 className="text-2xl font-bold mb-6">{book?.title}</h1>
            <p className="text-xl mb-6">{book?.authors}</p>
            <p className="text-xl mb-6">${book?.price}</p>
            <div className="mb-6 text-gray-700">
              <p>
                  {book?.description}
              </p>
            </div>

            <Button>Borrow</Button>
          </div>
        </div>
      </div>
      <div className="product-bottom mt-12 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold mb-4">Book Summary</h2>
        <p className="text-lg mb-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          omnis aut culpa blanditiis, animi at atque ullam doloremque quae fugit
          rem quis quas numquam? Aspernatur laudantium perspiciatis nesciunt
          maiores unde.
        </p>
      </div>
    </div>
  );
};

