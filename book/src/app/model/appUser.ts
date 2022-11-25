import {CartDetail} from './cartDetail';
import {Customer} from './customer';
import {UserRole} from './userRole';

export class AppUser {
  id: number;
  username: string;
  password: string;
  email: string;
  creationDate: string;
  phone: string;
  address: string;
  cartDetail: CartDetail;
  customer: Customer;
  userRoles: UserRole;
}
