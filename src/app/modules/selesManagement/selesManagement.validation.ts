import { z } from 'zod';

const createSelsManagementValidationSchema = z.object({
  body: z.object({
    nameOfBuyer: z.string({
      required_error: 'User is required',
    }),
    productId: z.string({
      required_error: 'Product is required',
    }),
    sellerId: z.string({
      required_error: 'Product is required',
    }),
    selsDate: z.string({
      required_error: 'Product is required',
    }),
    quantity: z.number().refine((val) => val >= 0, {
      message: 'Quantity must be a non-negative number',
    }),
  }),
});

export const selesValidation = {
  createSelsManagementValidationSchema,
};
