import {Book} from './book';
import {AppUser} from './appUser';


export class CartDetail {
  id: number;
  quantity: number;
  book: Book;
  status: number;
  appUser: AppUser;
}
