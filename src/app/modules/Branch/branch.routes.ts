import { Router } from 'express';
import validateRequest from '../../middlewares/valdateRequest';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { branchController } from './branch.controller';
import { branchValidationSchema } from './branch.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin),
  validateRequest(branchValidationSchema.createBranchNameSchema),
  branchController.createBranch,
);

router.get('/', auth(USER_ROLE.superAdmin), branchController.getAllBranch);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin),
  branchController.getSingleBranch,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validateRequest(branchValidationSchema.updateBranchNameSchema),
  branchController.updateBranch,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin),
  branchController.deleteBranch,
);

export const branchRoutes = router;
