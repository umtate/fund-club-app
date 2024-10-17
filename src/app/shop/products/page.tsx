import { booksData } from "../../data/books";
import {BooksListComponent} from "../../components/shop/BooksListComponent";


export default function ProductsPage() {
  return <BooksListComponent books={booksData} />;
}
