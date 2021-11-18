import {Product} from './product';


export interface Cart {
  _id?: string;
  product: Product | string |any;
  selectedQty: number;
  priceId?: string;
  user?: string;
}