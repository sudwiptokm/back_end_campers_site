import { Model } from 'mongoose';

export interface TProduct {
  name: string;
  imgId?: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  stock: number;
  subtitle?: string;
  promotion?: 'featured' | 'top_selling';
}

export interface ProductModel extends Model<TProduct> {
  // custom static methods here
  isProductExist(productId: string): Promise<boolean>;
}
