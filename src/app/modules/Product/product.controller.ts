import httpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

const GetAllProducts = catchAsync(async (req, res) => {
  const searchTerm = req.query.searchTerm as string | undefined;
  const result = await ProductService.GetAllProductsFromDB(searchTerm);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const CreateProduct = catchAsync(async (req, res) => {
  const product = req.body;
  const result = await ProductService.CreateProductIntoDB(product);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const CreateMultipleProducts = catchAsync(async (req, res) => {
  const { data: products } = req.body;
  const result = await ProductService.CreateMultipleProductsIntoDB(products);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Products created successfully',
    data: result,
  });
});

const UpdateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const result = await ProductService.UpdateProductIntoDB(id, product);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const DeleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ProductService.DeleteProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Product deleted successfully',
    data: null,
  });
});

export const ProductController = {
  GetAllProducts,
  CreateProduct,
  CreateMultipleProducts,
  UpdateProduct,
  DeleteProduct,
};
