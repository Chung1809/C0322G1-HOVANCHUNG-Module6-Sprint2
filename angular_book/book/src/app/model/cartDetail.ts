import {Book} from './book';
import {AppUser} from './appUser';


export class CartDetail {
  id: number;
  quantity: string;
  book: Book;
  user: AppUser;
}
