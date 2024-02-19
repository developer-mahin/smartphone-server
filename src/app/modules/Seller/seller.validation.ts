import { z } from 'zod';

const createSellerNameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

export const createSellerSchema = z.object({
  body: z.object({
    seller: z.object({
      name: createSellerNameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      location: z.object({
        country: z.string(),
        city: z.string(),
        home: z.string(),
      }),
    }),
  }),
});

const updateSellerNameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

export const updateSellerSchema = z.object({
  body: z.object({
    name: updateSellerNameSchema,
    gender: z.enum(['male', 'female', 'other']).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    location: z
      .object({
        country: z.string().optional(),
        city: z.string().optional(),
        home: z.string().optional(),
      })
      .optional(),
  }),
});

export const sellerValidationSchema = {
  createSellerSchema,
  updateSellerSchema,
};
