'use client'

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from 'next/navigation'


const bgColors = [
  "bg-purple-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-blue-400",
  "bg-yellow-400",
];

const getRandomColor = () => {
  return bgColors[Math.floor(Math.random() * 4) + 1];
};

interface BookListProps {
  books: any[];
}

export function BooksListComponent ({ books }: BookListProps){
  const router = useRouter()

  return (
    <main className="mt-4 font-sans flex flex-wrap justify-evenly items-center">
      {books.map((book, index) => {
        const randomColor = getRandomColor();

        return (
          <div
            key={index}
            className={`flex flex-col sm:flex-row rounded-lg mb-12 shadow-xl max-w-xl p-4 ${randomColor}`}
          >
            <img
              src={book.image}
              alt={book.title}
              className="book-img w-1/2 md:w-1/3 rounded-lg transition-transform transform hover:scale-105 shadow-md"
            />
            <div className="descp p-4 text-white">
              <h2 className="book-name text-lg font-bold">{book.title}</h2>
              <h3 className="author text-md">{book.author}</h3>
              <h3 className="rating text-md">{book.rating}</h3>
              <p className="info text-sm">{book.description}</p>
              <Button
                className="mt-4 bg-white text-gray-700 font-bold py-2 px-4 rounded-lg hover:text-purple-500"
                variant="outline"
                onClick={() => {
                  router.push('/shop/products/xxxxx');
                }}
              >
                See the Book
              </Button>
            </div>
          </div>
        );
      })}
    </main>
  );
};
