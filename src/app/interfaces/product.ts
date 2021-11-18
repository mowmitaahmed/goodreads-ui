import {ProductCategory} from './product-category';
import {ProductBrand} from './product-brand';
import {ProductUnitType} from './product-unit-type';

export interface Product {
  _id: string;
  productName: string;
  productSlug: string;
  sku: string;
  price: number;
  prices: PriceData[] | any;
  discountType: number;
  discountAmount: number;
  quantity: number;
  soldQuantity: number;
  images: string[];
//   attributes: string[] | ProductAttribute[];
  category: string | ProductCategory;
  categorySlug: string;
//   subCategory?: string | ProductSubCategory;
  subCategorySlug?: string;
  brand: string | ProductBrand;
  brandSlug: string;
//   generic: string | ProductGeneric;
  genericSlug: string;
  warrantyServices: string;
  shortDescription: string;
  description: string;
//   tags?: string[] | ProductTag[];
  ratingReview: any[];
  discussion: any[];
  // filterData: FilterData[];
  createdAt: Date;
  updatedAt: Date;
  stockVisibility?: boolean;
  productVisibility?: boolean;
  deliveryPolicy?: string;
  paymentPolicy?: string;
  warrantyPolicy?: string;
  campaignStartDate?: Date;
  campaignEndDate?: Date;
  emiStatus?: number[];
  select?: boolean;
}

// export interface FilterData {
//   _id: string;
//   attributeName: string;
//   attributeValues: string;
// }


export interface PriceData {
  _id: string;
  price: number;
  discountType?: number;
  discountAmount?: number;
  quantity: number;
  soldQuantity?: number;
  unit: string | ProductUnitType;
}
