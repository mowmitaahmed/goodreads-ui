
import {ProductAttribute} from './product-attribute';
export interface ProductCategory {
  attributes: ProductAttribute[];
  readOnly?: boolean;
  _id?: string;
  categoryName: string;
  categorySlug: string;
  priority?: number;
//   attributes: string[] | ProductAttribute[];
  image: string;
  isFeatured?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}