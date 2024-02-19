import { z } from 'zod';

const createBranchNameSchema = z.object({
  body: z.object({
    branchName: z.string({
      required_error: 'Branch Name is Required',
    }),
    branchLocation: z.string({
      required_error: 'Branch Location is Required',
    }),
  }),
});

const updateBranchNameSchema = z.object({
  body: z.object({
    branchName: z.string({}).optional(),
    branchLocation: z.string({}).optional(),
  }),
});

export const branchValidationSchema = {
  createBranchNameSchema,
  updateBranchNameSchema,
};
