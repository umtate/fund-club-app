import { Metadata } from "next";
import { booksData } from "../../data/books";
import BooksListComponent from "../../components/BooksListComponent";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default function ProductsPage() {
  return <BooksListComponent books={booksData} />;
}
