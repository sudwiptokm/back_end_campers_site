import { Schema, model } from 'mongoose';
import { ProductModel, TProduct } from './product.interface';

const ProductSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    imgId: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      validate: {
        validator: (v: number) => v >= 0,
        message: 'Price must be a positive number',
      },
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Product rating is required'],
      validate: {
        validator: (v: number) => v >= 0 && v <= 5,
        message: 'Rating must be between 0 and 5',
      },
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      validate: {
        validator: (v: number) => v >= 0,
        message: 'Stock must be a positive number',
      },
    },
    subtitle: {
      type: String,
    },
    promotion: {
      type: String,
      enum: ['featured', 'top_selling'],
    },
  },
  {
    timestamps: true,
  },
);

ProductSchema.statics.isProductExist = async function (
  productId: string,
): Promise<boolean> {
  return !!(await this.findById({ _id: productId }));
};

export const Product = model<TProduct, ProductModel>('Product', ProductSchema);
