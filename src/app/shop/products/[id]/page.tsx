"use client"

import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import {BookComponent} from "@/app/components/shop/BookComponent";
import { Book_v2, BookIntialState } from "@/app/types/Book";

export default function BookPage() {
  const params : {id: string} = useParams() ?? {id: ""}

  const [book, setBook] = useState<Book_v2>(BookIntialState)

  useEffect(() => {
    fetch(`/api/books/${params.id}`)
      .then((res) => res.json())
      .then((data: Book_v2) => setBook(data));
  }, []);

  return <BookComponent book={book} />;
}
