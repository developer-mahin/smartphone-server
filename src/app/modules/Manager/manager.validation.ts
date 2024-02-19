import { z } from 'zod';

const createManagerNameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

export const createManagerSchema = z.object({
  body: z.object({
    manager: z.object({
      name: createManagerNameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      address: z.string(),
    }),
  }),
});

const updateManagerNameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

export const updateManagerSchema = z.object({
  body: z.object({
    name: updateManagerNameSchema.optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    profileImage: z.string().optional(),
    isDeleted: z.boolean().optional(),
    address: z.string().optional(),
  }),
});

export const managerValidationSchema = {
  createManagerSchema,
  updateManagerSchema,
};
