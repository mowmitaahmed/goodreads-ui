import {environment} from '../../../environments/environment';

export const DATABASE_KEY = Object.freeze({
  loginToken: 'GOODREADS_TOKEN_' + environment.VERSION,
  loggInSession: 'GOODREADS_SESSION_' + environment.VERSION,
  loginTokenAdmin: 'GOODREADS_ADMIN_TOKEN_' + environment.VERSION,
  loggInSessionAdmin: 'GOODREADS_ADMIN_SESSION_' + environment.VERSION,
  encryptAdminLogin: 'GOODREADS_USER_0_' + environment.VERSION,
  encryptUserLogin: 'GOODREADS_USER_1_' + environment.VERSION,
  loginAdminRole: 'GOODREADS_ADMIN_ROLE_' + environment.VERSION,
  cartsProduct: 'GOODREADS_USER_CART_' + environment.VERSION,
  productFormData: 'GOODREADS_PRODUCT_FORM_' + environment.VERSION,
  userCart: 'GOODREADS_USER_CART_' + environment.VERSION,
  recommendedProduct: 'GOODREADS_RECOMMENDED_PRODUCT_' + environment.VERSION,
  userCoupon: 'GOODREADS_USER_COUPON_' + environment.VERSION,
  userCookieTerm: 'GOODREADS_COOKIE_TERM' + environment.VERSION,
});