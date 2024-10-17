"use client";

import { Book_v2 } from "@/app/types/Book";
import { BooksListComponent } from "../../components/shop/BooksListComponent";
import { useEffect, useState } from "react";

export default function ProductsPage() {

  const [books, setBooks] = useState<Book_v2[]>([])

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data: any[]) => setBooks(data));
  }, []);

  return <BooksListComponent books={books} />;
}
