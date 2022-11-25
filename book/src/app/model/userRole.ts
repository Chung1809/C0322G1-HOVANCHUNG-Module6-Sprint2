
import {Role} from './role';
import {AppUser} from './appUser';

export class UserRole {
  id: number;
  appUser: AppUser;
  appRole: Role;
}
