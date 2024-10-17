export interface Book {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  genre: string;
  edition: string;
  summary: string;
  numberOfPages: number;
  quantity: number;
  price: string;
  image: string;
}

export interface Book_v2 {
  id?: string;
  title: string;
  authors: string;
  publisher: string;
  publishedDate: string;
  description: string
  isbn: string;
  pageCount: number;
  printType: string;
  maturityRating:string;
  allowAnonLogging: false;
  contentVersion: string;
  image: string;
  language: string;
  previewLink:string;
  infoLink: string;
  canonicalVolumeLink: string;
  active: boolean;
  quantity: number;
  price: number;
}


export const BookIntialState: Book_v2 = {
	title: "",
	authors: "",
	publisher: "",
	publishedDate: "",
	description: "",
	isbn: "",
	pageCount: 0,
	printType: "",
	maturityRating: "",
	allowAnonLogging: false,
	contentVersion: "",
	image: "",
	language: "",
	previewLink: "",
	infoLink: "",
	canonicalVolumeLink: "",
	active: false,
	quantity: 0,
	price: 0
};
