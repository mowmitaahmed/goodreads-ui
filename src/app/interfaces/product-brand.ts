export interface ProductBrand {
    _id?: string;
    readOnly?: boolean;
    brandName: string;
    brandSlug: string;
    image: string;
    phoneNo?: string;
    email?: string;
    address?: string;
    isFeatured?: string;
    status?: string;
    priority?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }