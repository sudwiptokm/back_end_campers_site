import { z } from 'zod';

const ProductCreateValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Product name is required',
      invalid_type_error: 'Product name must be a string',
    })
    .nonempty({
      message: 'Product name must not be empty',
    }),
  imgId: z
    .string({
      invalid_type_error: 'Image ID must be a string',
    })
    .optional(),
  price: z
    .number({
      required_error: 'Product price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive({
      message: 'Price must be a positive number',
    }),
  description: z
    .string({
      required_error: 'Product description is required',
      invalid_type_error: 'Product description must be a string',
    })
    .nonempty({
      message: 'Product description must not be empty',
    }),
  category: z
    .string({
      required_error: 'Product category is required',
      invalid_type_error: 'Product category must be a string',
    })
    .nonempty({
      message: 'Product category must not be empty',
    }),
  rating: z
    .number({
      required_error: 'Product rating is required',
      invalid_type_error: 'Product rating must be a number',
    })
    .min(0)
    .max(5, {
      message: 'Rating must be between 0 and 5',
    }),
  stock: z
    .number({
      required_error: 'Product stock is required',
      invalid_type_error: 'Product stock must be a number',
    })
    .positive({
      message: 'Stock must be a positive number',
    }),
  subtitle: z
    .string({
      invalid_type_error: 'Product subtitle must be a string',
    })
    .optional(),
  promotion: z.enum(['featured', 'top_selling', '']).optional(),
});

const ProductUpdateValidationSchema = ProductCreateValidationSchema.partial();

const ProductMultipleCreateValidationSchema = z.object({
  data: z.array(ProductCreateValidationSchema),
});

export const ProductValidation = {
  ProductCreateValidationSchema,
  ProductUpdateValidationSchema,
  ProductMultipleCreateValidationSchema,
};
