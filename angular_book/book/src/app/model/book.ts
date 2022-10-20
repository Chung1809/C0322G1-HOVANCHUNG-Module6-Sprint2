import {Category} from "./category";
import {Discount} from "./discount";

export  interface Book {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  price?: string;
  image?: string;
  publisher?: string;
  totalPage?: string;
  author?: string;
  releaseDate?: string;
  category?: Category;
  discount?: Discount;
}

