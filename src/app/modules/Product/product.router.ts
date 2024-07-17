import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';

const router = express.Router();

router.get('/', ProductController.GetAllProducts);

router.post(
  '/',
  validateRequest(ProductValidation.ProductCreateValidationSchema),
  ProductController.CreateProduct,
);

router.post(
  '/multiple',
  validateRequest(ProductValidation.ProductMultipleCreateValidationSchema),
  ProductController.CreateMultipleProducts,
);

router.put(
  '/:id',
  validateRequest(ProductValidation.ProductUpdateValidationSchema),
  ProductController.UpdateProduct,
);

router.delete('/:id', ProductController.DeleteProduct);

export const ProductRouter = router;
