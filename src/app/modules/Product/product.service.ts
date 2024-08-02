import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const GetAllProductsFromDB = async (searchTerm: string | undefined) => {
  let query = {};

  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }

  return await Product.find(query);
};

const CreateProductIntoDB = async (product: TProduct) => {
  return await Product.create(product);
};

const CreateMultipleProductsIntoDB = async (products: TProduct[]) => {
  return await Product.insertMany(products);
};

const UpdateProductIntoDB = async (productId: string, product: TProduct) => {
  if (!(await Product.isProductExist(productId))) {
    throw new AppError(404, 'Product not found');
  }

  let updateOperation: any = { $set: product };

  // If promotion is an empty string, use $unset to remove it from the document
  if (product.promotion === '') {
    delete product.promotion;
    updateOperation.$unset = { promotion: '' };
  }

  return await Product.findByIdAndUpdate({ _id: productId }, updateOperation, {
    new: true,
  });
};

const DeleteProductFromDB = async (productId: string) => {
  if (!(await Product.isProductExist(productId))) {
    throw new AppError(404, 'Product not found');
  }
  return await Product.findByIdAndDelete({ _id: productId });
};

export const ProductService = {
  GetAllProductsFromDB,
  CreateProductIntoDB,
  CreateMultipleProductsIntoDB,
  UpdateProductIntoDB,
  DeleteProductFromDB,
};
