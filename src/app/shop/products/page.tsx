"use client";

import { Book } from "@/lib/definitions";
import { BooksListComponent } from "../../components/shop/BooksListComponent";
import { useEffect, useState } from "react";

export default function ProductsPage() {

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data));
  }, []);

  return <BooksListComponent books={books} />;
}
