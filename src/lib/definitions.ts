export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
}

export interface Cart {
  uuid: string;
  createDate: Date;
  updateDate: Date;
  customerId: string;
  status: string;
  cartItems: CartItem[];
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface Book {
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
