import {Cart} from './cart';
import {Wishlist} from './wishlist';
import {Validators} from '@angular/forms';

export interface User {
  _id?: string;
  fullName: string;
  username?: string;
  gender?: string;
  birthdate?: Date;
  email?: string;
  phoneNo?: string;
  address?: string;
  profileImg?: string;
  district?: string;
  area?: string;
  shippingAddress?: string;
  password?: string;
  checkouts?: any[];
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  registrationType?: string;
  registrationAt?: Date;
  hasAccess?: boolean;
  occupation?: string;
  carts?: string | Cart[];
  wishlists?: string[] | Wishlist[];
  createdAt?: any;
  updatedAt?: any;
}
