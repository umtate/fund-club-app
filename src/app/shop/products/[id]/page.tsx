"use client"

import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import {BookComponent} from "@/app/components/shop/BookComponent";
import { BookIntialState } from "@/app/types/Book";
import { Book } from '@/lib/definitions';

export default function BookPage() {
  const params : {id: string} = useParams() ?? {id: ""}

  const [book, setBook] = useState<Book>(BookIntialState)

  useEffect(() => {
    fetch(`/api/books/${params.id}`)
      .then((res) => res.json())
      .then((data: Book) => setBook(data));
  }, [params.id]);

  return <BookComponent book={book} />;
}
